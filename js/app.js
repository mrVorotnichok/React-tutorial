var myNews = [
  {
    author: 'first author',
    title: 'fist new',
    text: 'description new'
  },

  {
    author: 'second author',
    title: 'second new',
    text: 'description second new'
  },
];

window.ee = new EventEmitter();

var Article = React.createClass({
  propTypes: {
    data: React.PropTypes.shape({
      author: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired
    })
  },

  getInitialState: function () {
    return {
      visible: false
    }
  },

  /*функция для изменения состояния компонента*/
  readMoreClick : function (e) {
    e.preventDefault();
    this.setState({visible: true})
  },

  render: function () {
    var author = this.props.data.author,
        title = this.props.data.title,
        text = this.props.data.text,
        visible = this.state.visible; // считываем значение переменной из состояния компонента

    return (
      <div className='article'>
        <p className='news__author'>{author}:</p>
        <p className='news__title'>{title}</p>

        {/* для ссылки readmore: не показывай ссылку, если visible === true */}
        <a href="#"
           onClick={this.readMoreClick}
           className={'news__readMore ' + (visible ? 'none':'')}>
          Подробнее
        </a>

        {/*не показывай текст, если visible === false */}
        <p className={'news__text ' + (visible ? '':'none')}>{text}</p>
      </div>
    )
  }
});

var News = React.createClass({
  propsTypes: {
    data: React.PropTypes.array.isRequired
  },

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
        <strong
          className={'news__count ' + (data.length > 0 ? '':'.none')}>
          Всего	новостей:	{data.length}
        </strong>
      </div>
    )
  }
});

var Add = React.createClass({
  getInitialState: function() { //устанавливаем начальное состояние (state)
    return {
      agreeNotChecked: true,
      authorIsEmpty: true,
      titleIsEmpty: true
    };
  },

  componentDidMount: function() {
    ReactDOM.findDOMNode(this.refs.author).focus();
  },

  //удаляем заголовок новости и оставляем автора и чекбокс
  onBtnClickHandler: function(e) {
    e.preventDefault();
    var titleEl = ReactDOM.findDOMNode(this.refs.title);

    var author = ReactDOM.findDOMNode(this.refs.author).value;
    var title = titleEl.value;

    var item = [{
      author: author,
      title: title,
      text: '...'
    }];

    window.ee.emit('News.add', item);

    titleEl.value = '';
    this.setState({titleIsEmpty: true});
  },

  onCheckRuleClick: function() {
    this.setState({agreeNotChecked: !this.state.agreeNotChecked}); //устанавливаем значение в state
  },

  onFieldChange: function(fieldName, e) {
    var next ={};

    if (e.target.value.trim().length > 0) {
      next[fieldName] = false;
      this.setState(next);
    } else {
      next[fieldName] = true;
      this.setState(next);
    }
  },

  render: function() {
    var agreeNotChecked = this.state.agreeNotChecked,
      authorIsEmpty = this.state.authorIsEmpty,
      titleIsEmpty = this.state.titleIsEmpty;

    return (
      <form className='add cf'>
        <input
          type='text'
          className='add__author'
          onChange={this.onFieldChange.bind(this, 'authorIsEmpty')}
          placeholder='Ваше имя'
          ref='author'
        />

        <textarea
          className='add__title'
          onChange={this.onFieldChange.bind(this, 'titleIsEmpty')}
          placeholder='Заголовок новости'
          ref='title'
        ></textarea>

        <label className='add__checkrule'>
          <input type='checkbox' ref='checkrule' onChange={this.onCheckRuleClick}/>Я согласен с правилами
        </label>

        <button
          className='add__btn'
          onClick={this.onBtnClickHandler}
          ref='alert_button'
          disabled={agreeNotChecked || authorIsEmpty || titleIsEmpty}
        >
          Добавить новость
        </button>
      </form>
    );
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {
      news: myNews
    };
  },

  componentDidMount: function() {
    var self = this;
    window.ee.addListener('News.add', function(item) {
      var nextNews = item.concat(self.state.news);
      self.setState({news: nextNews});
    });
  },

  componentWillUnmount: function() {
    window.ee.removeListener('News.add');
  },

  render: function() {
    console.log('render');
    return (
      <div className="app">
        <Add/>
        <h3>Новости</h3>
        <News data={this.state.news}/>
      </div>
    );
  }
});

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);