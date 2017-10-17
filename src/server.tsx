import * as path from 'path';
import * as compression from 'compression';
import * as express from 'express';
import ejs from 'ejs';

const app = express();

console.log(__dirname);

app.use(compression());
app.use(express.static(`${__dirname}/assets`));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('*', (req, res) => {  
  res.render('index', { title: 'hoge' });
});

app.listen(3000);
