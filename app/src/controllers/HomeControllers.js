import mysql from 'mysql2';

class HomeController {
  index(req, res) {
    const connection = mysql.createConnection({
      host: 'mysqlcontainer',
      user: 'root',
      password: 'roott',
      database: 'DB_PFA',
    });
    connection.query(
      'SELECT * FROM `TB_SUBJECTS`',
      function (err, results, fields) {
        if (err) {
          return res.send(`Deu ruim :(  
          ${err.message}`);
        }
        return res.send(`
      <h1>Full Cycle Rocks!</h1>
      <ul>
      ${results.reduce((agg, cur) => agg + `<li>${cur.DS_SUBJECT}</li>`, '')}
      </ul>`);
      }
    );
  }
}

export default new HomeController();
