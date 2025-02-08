import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchTodos()
  }, [])

  // Todo-ları API-dən çəkmək üçün funksiya
  const fetchTodos = async () => {
    try {
      const response = await fetch('https://dummyjson.com/todos')
      const data = await response.json()
      setTodos(data.todos)
      setLoading(false)
    } catch (error) {
      console.error('Xəta baş verdi:', error)
      setLoading(false)
    }
  }

  // Filtrələnmiş todo-ları qaytaran funksiya
  const getFilteredTodos = () => {
    switch (filter) {
      case 'completed':
        return todos.filter(todo => todo.completed)
      case 'incomplete':
        return todos.filter(todo => !todo.completed)
      default:
        return todos
    }
  }

  // Todo kartı komponenti
  const TodoCard = ({ todo }) => (
    <div className={`todo-card ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-header">
        <span>ID: {todo.id}</span>
        <span>İstifadəçi ID: {todo.userId}</span>
      </div>
      <p className="todo-text">{todo.todo}</p>
      <div className="todo-status">
        <span className={`status-badge ${todo.completed ? 'completed' : 'incomplete'}`}>
          {todo.completed ? 'Tamamlanıb ✓' : 'Tamamlanmayıb ✗'}
        </span>
      </div>
    </div>
  )

  // Add PropTypes validation
  TodoCard.propTypes = {
    todo: PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      todo: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired
    }).isRequired
  }

  return (
    <div className="container">
      <h1 className="title">Todo Viewer</h1>
      
      {/* Filter Düymələri */}
      <div className="filter-buttons">
        <button 
          className={`filter-btn all ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Hamısını Göstər
        </button>
        <button 
          className={`filter-btn completed ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Tamamlanmışları Göstər
        </button>
        <button 
          className={`filter-btn incomplete ${filter === 'incomplete' ? 'active' : ''}`}
          onClick={() => setFilter('incomplete')}
        >
          Tamamlanmamışları Göstər
        </button>
      </div>

      {/* Yüklənmə və Todo-lar */}
      {loading ? (
        <div className="loading">Yüklənir...</div>
      ) : (
        <div className="todos-grid">
          {getFilteredTodos().map(todo => (
            <TodoCard key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App 

