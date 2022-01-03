import React, { useRef, useState } from 'react'
import { IUser } from '../interfaces'

export default function MemberForm({ user, setNewMember }: { user: IUser | undefined, setNewMember: any }) {
  const [invalid, setInvalid] = useState(true)
  
  const isSsnValid = () => {
    const regex = /^(([0-9]{3})+(-[0-9]{2})+(-[0-9]{4}))$/i;
    return regex.test(ssn?.current?.value.trim());
  }

  const checkValidity = () => {
    if (fistName?.current?.value && lastName?.current?.value &&
        address?.current?.value && isSsnValid() ) {
      setInvalid(false)
    } else setInvalid(true)
  }

  const resetButton = useRef<any>()
  
  const fistName = useRef<any>()
  const lastName = useRef<any>()
  const address = useRef<any>()
  const ssn = useRef<any>()
  
  const submitData = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    fetch('http://localhost:8081/api/members', {
      method: 'POST',
      headers: new Headers({
        'Authorization': 'Jwt '+user?.token,
        'Accept': 'application/json', 
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        "firstName": fistName?.current?.value.trim() ,
        "lastName": lastName?.current?.value.trim(),
        "address": address?.current?.value.trim(),
        "ssn": ssn?.current?.value.trim()
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        if (res.code === 'BadRequest'){
          alert(res.message)
        } else {
          setNewMember(res)
          resetButton.current.click()
          alert('Success!')
        }
      })
  }

  
  return (
    <form onChange={checkValidity} onSubmit={event => submitData(event)}>
      <input type="text" ref={fistName} placeholder='First Name' required />
      <input type="text" ref={lastName} placeholder='Last Name'  required />
      <input type="text" ref={address} placeholder='Address'  required />
      <input type="text" ref={ssn} pattern='([0-9]+(-[0-9]+)+)' placeholder='SSN (XXX-XX-XXXX)'  required />
      <div>
        <button ref={resetButton} type="reset">Reset</button>
        <button type="submit" disabled={invalid}>Save</button>
      </div>
    </form> 
  )
}
