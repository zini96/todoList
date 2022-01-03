import {createGlobalStyle, useTheme} from 'styled-components'  //전체를 감싸는 스타일 만들때 사용
import TodoHeader from './components/TodoHeader';
import TodoTemplate from './components/TodoTemplate';
import TodoList from './components/TodoList';
import TodoInsert from './components/TodoInsert';
import {useState, useRef} from "react";

const GlobalStyle = createGlobalStyle`
body{
  background:#e9ecef;
}
`;

function App() {
  //항목들 상태관리
  const [todoList,settodoList] = useState([
    {
      id: 1,
      text : "프로젝트 관리하기",
      idDone: false
    },
    {
      id: 2,
      text : "스타일 컴포넌트",
      idDone: false
    },
    {
      id: 3,
      text : "스타일 컴포넌트",
      idDone: false
    }
  ]);
  //인풋입력값 상태관리
  const [desc, setDesc] = useState("");
  //항목id관리
  const idNum = useRef(4);

  function onChange(e){
    const inputValue = e.target.value;
    setDesc(inputValue);
  }

  function onCreatelist(e){
    e.preventDefault();
    //새로운 객체만들기
    const list = {
      id: idNum.current,
      text:desc,
      idDone: false
    }
    //todolist배열 업데이트
    settodoList([
      ...todoList,list
    ])
    //항목id관리-idNum값 1씩 추가
    idNum.current = idNum.current+1
  }

  //해당id항목 삭제하기
  function onRemove(id){
    settodoList(todoList.filter(todo=>todo.id !== id));
  }
  //해당 id항목 isDone 반전
  function onToggle(id){
    settodoList(todoList.map(todo=>todo.id === id? {...todo,idDone : !todo.idDone} : todo))
  }


  return (
    <div className="App">
      <div>
        <h1>안녕하세요</h1>
        <p>원격저장소 테스트입니다</p>
      </div>
      <GlobalStyle/>
      <TodoTemplate>
        <TodoHeader todoList={todoList}/>
        <TodoList todoList={todoList} onRemove={onRemove} onToggle={onToggle}/>
        <TodoInsert onChange={onChange} onCreatelist={onCreatelist} desc={desc}/>
      </TodoTemplate>
    </div>
  );
}

export default App;
