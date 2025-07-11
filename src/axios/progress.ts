import instance from './config'

interface ProgressPayload {
  [key: string]: any;
}

const progressApi = {
  getAllTasksByThesis(thesesId: string): Promise<any> {
    return instance.get(`/progress/theses/${thesesId}/tasks`)
  },
  getTaskProgressById(taskId: string): Promise<any> {
    return instance.get(`/progress/tasks/${taskId}`)
  },
  createTaskProgress(thesisId: string, payload: ProgressPayload ): Promise<any> {
    return instance.post(`/progress/theses/${thesisId}/tasks`, payload)
  },
  updateStatusTaskProgress(taskId: string, payload: ProgressPayload): Promise<any> {
    return instance.patch(`/progress/tasks/${taskId}/status`, payload)
  },
  updateTaskProgress(taskId: string, payload: ProgressPayload): Promise<any> {
    return instance.put(`/progress/tasks/${taskId}`, payload)
  },
  deleteTaskProgress(taskId: string): Promise<any> {
    return instance.delete(`/progress/tasks/${taskId}`)
  }
}

export default progressApi
