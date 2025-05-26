import React, { useEffect, useState } from 'react'
import { getStudents } from '../services/api'

const StudentList = () => {
  const [students, setStudents] = useState([])

  useEffect(() => {
    getStudents().then(data => setStudents(data))
  }, [])

  return (
    <div>
      <h2>Lista de Alunos</h2>
      <ul>
        {students.map(student => (
          <li key={student._id}>
            {student.name} - {student.email}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StudentList
