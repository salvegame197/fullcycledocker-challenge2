import mysql from 'mysql2';
const config = {
  host: 'mysqlcontainer',
  user: 'root',
  password: 'roott',
  database: 'DB_PFA',
};
class Database {
  constructor() {
    try {
      const connection = mysql.createConnection(config);
      this.connection = connection;
    } catch (ex) {
      console.error(ex.toString());
    }
  }
  init() {
    mysql.createConnection(config);
  }
  query(sql, params) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, params, function (error, results, fields) {
        if (error) {
          console.error(error.message);
          reject(error);

          //throw error;
        } else {
          resolve(results);
        }
      });
    });
  }
  select(tableName, where, options) {
    var sql = '';
    var columns = '*';
    var data = [],
      c1 = [],
      c2 = [];
    if (!options) {
      options = {};
    }

    if (options.columns) {
      columns = options.columns.join(',');
    }
    if (tableName.indexOf('select') == -1) {
      sql = 'select ' + columns + ' from ' + tableName;
    } else {
      sql = tableName;
    }

    if (options['join'] && options['join']['on']) {
      sql += ' inner join ' + options['join']['table'] + ' on (';

      var obj = options['join']['on'];
      for (var key in obj) {
        sql += key + '=' + obj[key];
      }
      sql += ')';
    }

    if (where && JSON.stringify(where) != '{}') {
      for (let key in where) {
        let item = where[key];

        if (options.join && key.indexOf('.') == -1) {
          data.push(item);
          c1.push('a.' + key + '=?');
        } else {
          //c1.push(key+"=?");
          if (Array.isArray(item)) {
            data = data.concat(item);
            var str = item
              .map(() => {
                return '?';
              })
              .join(',');
            c1.push(key + ' in (' + str + ')');
          } else {
            data.push(item);
            c1.push(key + '=?');
          }
        }
      }
      sql += ' where ' + c1.join(' and ');
    }

    if (options.orderBy) {
      sql += ' order by ' + options.orderBy;
    }

    if (options.pageIndex != undefined) {
      let promise1 = this.count(sql, data);
      sql +=
        ' limit ' +
        (options.pageIndex - 1) * options.pageSize +
        ',' +
        options.pageSize;
      let promise2 = this.query(sql, data);
      return new Promise((resolve) => {
        Promise.all([promise1, promise2]).then((values) => {
          resolve({
            totalCount: values[0],
            rows: values[1],
          });
        });
      });
    } else {
      return this.query(sql, data);
    }
  }
}

export default new Database();
