var myNews = [
  {
    author: 'first author',
    text: 'fist new'
  },

  {
    author: 'second author',
    text: 'second new'
  },
];

var Article = React.createClass({
  render: function () {
    var author = this.props.data.author,
        text = this.props.data.author;

    return (
      <div className="article">
        <p className="news__author">{author}:</p>
        <p className="news__text">{text}</p>
      </div>
    )
  }
});

var News = React.createClass({
  render: function () {
    var data = this.props.data;
    var newsTemplate;


    if(data.length > 0) {

      /*создаем массив с react-элементами*/
      newsTemplate = data.map(function (item, index) {
        return(
          <div key={index}>
            <Article data={item}/>
          </div>
        )
      });
    } else {
      newsTemplate = <p>Новостей нет :(</p>
    }

    /*возвращаем разметку*/
    return(
      <div className="news">
        {newsTemplate}
        <strong className={data.length > 0 ? '':'.none'}>Всего	новостей:	{data.length}</strong>
      </div>
    )
  }
});

var App = React.createClass({
  render: function() {
    return (
      <div className="app">
        <h3>Новости</h3>
        <News data={myNews}/>
      </div>
    );
  }
});

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);