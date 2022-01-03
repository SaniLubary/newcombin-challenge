import { useEffect, useRef, useState } from 'react'
import { IUser, IMember } from './interfaces'
import './App.css'
import MemberForm from './components/MemberForm'
import IdleStateDetector from './components/IdleDetector'

function App() {
  const [members, setMembers] = useState<IMember[]>([])
  const [user, setUser] = useState<IUser>()
  const [newMember, setNewMember] = useState<IMember>()

  useEffect(() => {
    fetchUser()
  }, [])

  useEffect(() => {
    user && fetchMembers()
  }, [user])

  useEffect(() => {
    newMember && setMembers([...members, newMember])
  }, [newMember])

  function fetchUser() {
    fetch('http://localhost:8081/auth', {
      method: 'POST',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({username: "sarah", password: "connor"})
    })
      .then(res => res.json())
      .then(user => setUser(user))
  }
  
  function fetchMembers() {
    fetch('http://localhost:8081/api/members', {
      method: 'GET',
      headers: new Headers({
        'Authorization': 'Jwt '+user?.token, 
      }),
    })
      .then(res => res.json())
      .then(members => setMembers(members))
  }
  
  const onIdle = () => {
    user && fetchMembers()
  }
  
  return (
    <div className="App">
      <IdleStateDetector delay={60000} onIdle={onIdle} onActive={null}/>
      <nav>
        <ul className='nav-ul'>
          <li>
            HOME
          </li>
          <li>
            OTHER PAGE
          </li>
        </ul>
      </nav>

      <div className='body-container'>
        <div className='form'>
          <MemberForm user={user} setNewMember={setNewMember} /> 
        </div>

        <div className='table'>
          <table style={{width: '100%'}}>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>SSN</th>
              </tr>
            </thead>
            <tbody>
              {members.length > 0 && members.map(member => {
                return <tr key={member.ssn}>
                  <td>{member.firstName}</td>
                  <td>{member.lastName}</td>
                  <td>{member.address}</td>
                  <td>{member.ssn}</td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div id='footer'>
        <div style={{textAlign: 'left'}}>
          copyright
        </div>
        <div style={{textAlign: 'right'}}>
          All rights reserved
        </div>
      </div>
    </div>
  )
}

export default App
