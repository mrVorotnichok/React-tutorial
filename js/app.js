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

  getInitialState: function () {
    return {
      counter: 0
    }
  },

  onTotalNewsClick: function() {
    this.setState({counter: ++this.state.counter });
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
          className={data.length > 0 ? '':'.none'}
          onClick={this.onTotalNewsClick}>
          Всего	новостей:	{data.length}
        </strong>
      </div>
    )
  }
});

var Add = React.createClass({
  getInitialState: function() { //устанавливаем начальное состояние (state)
    return {
      btnIsDisabled: true
    };
  },
  
  componentDidMount: function() {
    ReactDOM.findDOMNode(this.refs.author).focus();
  },
  onBtnClickHandler: function(e) {
    e.preventDefault();
    var author = ReactDOM.findDOMNode(this.refs.author).value;
    var text = ReactDOM.findDOMNode(this.refs.text).value;

    alert(author + '\n' + text);
  },

  onCheckRuleClick: function() {
    this.setState({btnIsDisabled: !this.state.btnIsDisabled}); //устанавливаем значение в state
  },

  render: function() {
    return (
      <form className='add cf'>
        <input
          type='text'
          className='add__author'
          defaultValue=''
          placeholder='Ваше имя'
          ref='author'
        />
        <textarea
          className='add__text'
          defaultValue=''
          placeholder='Текст новости'
          ref='text'
        ></textarea>
        <label className='add__checkrule'>
          <input type='checkbox' ref='checkrule' onChange={this.onCheckRuleClick}/>Я согласен с правилами
        </label>

        {/* берем значение для disabled атрибута из state */}
        <button
          className='add__btn'
          onClick={this.onBtnClickHandler}
          ref='alert_button'
          disabled={this.state.btnIsDisabled}
        >
          Показать alert
        </button>
      </form>
    );
  }
});

var App = React.createClass({
  render: function() {
    return (
      <div className="app">
        <Add/>
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