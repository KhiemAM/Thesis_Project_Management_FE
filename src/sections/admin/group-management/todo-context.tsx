import { v4 as uuidv4 } from 'uuid'
import React, { useState, useEffect, useContext, useReducer, createContext } from 'react'

import type { Todo } from './types'

// Initial state
const initialTodos: Todo[] = [
  {
    id: uuidv4(),
    title: 'Hoàn thành đề xuất dự án',
    description: 'Thực hiện đề xuất dự án cho khách hàng ABC',
    completed: false,
    priority: 'Cao',
    dueDate: '05-01-2025',
    createdAt: new Date().toISOString(),
    results: [
      {
        id: uuidv4(),
        type: 'text',
        content: 'Draft proposal created with initial requirements',
        createdAt: new Date().toISOString()
      }
    ],
    comments: [
      {
        id: uuidv4(),
        content: 'Don\'t forget to include budget estimates',
        createdAt: new Date().toISOString()
      }
    ]
  },
  {
    id: uuidv4(),
    title: 'Lịch trình cuộc họp nhóm',
    description: 'Lên lịch cuộc họp nhóm hàng tuần để thảo luận về tiến độ dự án và vấn đề phát sinh'+
                 'Lên lịch cuộc họp nhóm hàng tuần để thảo luận về tiến độ dự án và vấn đề phát sinh'+
                 'Lên lịch cuộc họp nhóm hàng tuần để thảo luận về tiến độ dự án và vấn đề phát sinh'+
                 'Lên lịch cuộc họp nhóm hàng tuần để thảo luận về tiến độ dự án và vấn đề phát sinh',
    completed: true,
    priority: 'Trung bình',
    dueDate: '15-01-2025',
    createdAt: new Date().toISOString(),
    results: [],
    comments: []
  },
  {
    id: uuidv4(),
    title: 'Thiết kế giao diện người dùng mới',
    description: 'Thiết kế giao diện người dùng mới cho ứng dụng',
    completed: false,
    priority: 'Trung bình',
    dueDate: '20-01-2025',
    createdAt: new Date().toISOString(),
    results: [
      {
        id: uuidv4(),
        type: 'image',
        content: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        createdAt: new Date().toISOString()
      },
      {
        id: uuidv4(),
        type: 'text',
        content: 'Draft proposal created with initial requirements',
        createdAt: new Date().toISOString()
      }
    ],
    comments: []
  },
  {
    id: uuidv4(),
    title: 'Thiết kế giao diện quản lý nhóm',
    description: 'Thiết kế giao diện quản lý nhóm cho ứng dụng',
    completed: false,
    priority: 'Thấp',
    dueDate: '20-01-2025',
    createdAt: new Date().toISOString(),
    results: [
      {
        id: uuidv4(),
        type: 'image',
        content: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        createdAt: new Date().toISOString()
      }
    ],
    comments: []
  }
]

// Action types
type ActionType =
  | { type: 'ADD_TODO'; payload: Omit<Todo, 'id' | 'createdAt' | 'results' | 'comments'> }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'UPDATE_TODO'; payload: Todo }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'ADD_COMMENT'; payload: { todoId: string; content: string } }
  | { type: 'DELETE_COMMENT'; payload: { todoId: string; commentId: string } }
  | { type: 'ADD_RESULT'; payload: { todoId: string; type: 'text' | 'image'; content: string } }
  | { type: 'DELETE_RESULT'; payload: { todoId: string; resultId: string } };

// Reducer function
const todoReducer = (state: Todo[], action: ActionType): Todo[] => {
  switch (action.type) {
  case 'ADD_TODO':
    return [
      ...state,
      {
        ...action.payload,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        results: [],
        comments: []
      }
    ]

  case 'TOGGLE_TODO':
    return state.map((todo) =>
      todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
    )

  case 'UPDATE_TODO':
    return state.map((todo) =>
      todo.id === action.payload.id ? action.payload : todo
    )

  case 'DELETE_TODO':
    return state.filter((todo) => todo.id !== action.payload)

  case 'ADD_COMMENT':
    return state.map((todo) =>
      todo.id === action.payload.todoId
        ? {
          ...todo,
          comments: [
            ...todo.comments,
            {
              id: uuidv4(),
              content: action.payload.content,
              createdAt: new Date().toISOString()
            }
          ]
        }
        : todo
    )

  case 'DELETE_COMMENT':
    return state.map((todo) =>
      todo.id === action.payload.todoId
        ? {
          ...todo,
          comments: todo.comments.filter(
            (comment) => comment.id !== action.payload.commentId
          )
        }
        : todo
    )

  case 'ADD_RESULT':
    return state.map((todo) =>
      todo.id === action.payload.todoId
        ? {
          ...todo,
          results: [
            ...todo.results,
            {
              id: uuidv4(),
              type: action.payload.type,
              content: action.payload.content,
              createdAt: new Date().toISOString()
            }
          ]
        }
        : todo
    )

  case 'DELETE_RESULT':
    return state.map((todo) =>
      todo.id === action.payload.todoId
        ? {
          ...todo,
          results: todo.results.filter(
            (result) => result.id !== action.payload.resultId
          )
        }
        : todo
    )

  default:
    return state
  }
}

// Context interface
interface TodoContextProps {
  todos: Todo[];
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'results' | 'comments'>) => void;
  toggleTodo: (id: string) => void;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
  addComment: (todoId: string, content: string) => void;
  deleteComment: (todoId: string, commentId: string) => void;
  addResult: (todoId: string, type: 'text' | 'image', content: string) => void;
  deleteResult: (todoId: string, resultId: string) => void;
  selectedTodo: Todo | null;
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  filterCompleted: boolean;
  setFilterCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

// Create context
const TodoContext = createContext<TodoContextProps | undefined>(undefined)

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, initialTodos)
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)
  const [filterCompleted, setFilterCompleted] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')

  const addTodo = (todo: Omit<Todo, 'id' | 'createdAt' | 'results' | 'comments'>) => {
    dispatch({ type: 'ADD_TODO', payload: todo })
  }

  const toggleTodo = (id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id })
  }

  const updateTodo = (todo: Todo) => {
    dispatch({ type: 'UPDATE_TODO', payload: todo })
  }

  const deleteTodo = (id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: id })
  }

  const addComment = (todoId: string, content: string) => {
    dispatch({ type: 'ADD_COMMENT', payload: { todoId, content } })
  }

  const deleteComment = (todoId: string, commentId: string) => {
    dispatch({ type: 'DELETE_COMMENT', payload: { todoId, commentId } })
  }

  const addResult = (todoId: string, type: 'text' | 'image', content: string) => {
    dispatch({ type: 'ADD_RESULT', payload: { todoId, type, content } })
  }

  const deleteResult = (todoId: string, resultId: string) => {
    dispatch({ type: 'DELETE_RESULT', payload: { todoId, resultId } })
  }

  // Update selected todo when the todos change
  useEffect(() => {
    if (selectedTodo) {
      const updatedSelectedTodo = todos.find(todo => todo.id === selectedTodo.id) || null
      setSelectedTodo(updatedSelectedTodo)
    }
  }, [todos, selectedTodo])

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        toggleTodo,
        updateTodo,
        deleteTodo,
        addComment,
        deleteComment,
        addResult,
        deleteResult,
        selectedTodo,
        setSelectedTodo,
        filterCompleted,
        setFilterCompleted,
        searchTerm,
        setSearchTerm
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

// Custom hook
export const useTodo = () => {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider')
  }
  return context
}