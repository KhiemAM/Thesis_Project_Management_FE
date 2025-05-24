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
    message: [
      {
        id: uuidv4(),
        type: 'image',
        content: [
          'Thực hiện đề xuất dự án cho khách hàng ABC',
          '/assets/images/cover/cover-1.webp'
        ],
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
    message: []
  },
  {
    id: uuidv4(),
    title: 'Thiết kế giao diện người dùng mới',
    description: 'Thiết kế giao diện người dùng mới cho ứng dụng',
    completed: false,
    priority: 'Trung bình',
    dueDate: '20-01-2025',
    createdAt: new Date().toISOString(),
    message: [
      {
        id: uuidv4(),
        type: 'image',
        content: [
          'Thiết kế giao diện người dùng mới cho ứng dụng',
          '/assets/images/cover/cover-1.webp',
          '/assets/images/cover/cover-2.webp',
          '/assets/images/cover/cover-3.webp'
        ],
        createdAt: new Date().toISOString()
      },
      {
        id: uuidv4(),
        type: 'text',
        content: ['Thiết kế giao diện người dùng mới cho ứng dụng'],
        createdAt: new Date().toISOString()
      }
    ]
  },
  {
    id: uuidv4(),
    title: 'Thiết kế giao diện quản lý nhóm',
    description: 'Thiết kế giao diện quản lý nhóm cho ứng dụng',
    completed: false,
    priority: 'Thấp',
    dueDate: '20-01-2025',
    createdAt: new Date().toISOString(),
    message: []
  }
]

// Action types
type ActionType =
  | { type: 'ADD_TODO'; payload: Omit<Todo, 'id' | 'createdAt' | 'results' | 'comments'> }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'UPDATE_TODO'; payload: Todo }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'ADD_COMMENT'; payload: { todoId: string; content: string[]; type: 'text' | 'image' } }
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
        message: []
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
          message: [
            ...todo.message,
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

  case 'DELETE_COMMENT':
    return state.map((todo) =>
      todo.id === action.payload.todoId
        ? {
          ...todo,
          message: todo.message.filter(
            (comment) => comment.id !== action.payload.commentId
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
  addComment: (todoId: string, content: string[], type: 'text' | 'image') => void;
  deleteComment: (todoId: string, commentId: string) => void;
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

  const addComment = (todoId: string, content: string[], type: 'text' | 'image') => {
    dispatch({ type: 'ADD_COMMENT', payload: { todoId, content, type } })
  }

  const deleteComment = (todoId: string, commentId: string) => {
    dispatch({ type: 'DELETE_COMMENT', payload: { todoId, commentId } })
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