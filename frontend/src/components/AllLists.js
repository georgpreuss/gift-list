import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import axios from 'axios'
import Auth from '../lib/auth'
// import posed from 'react-pose'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

// // popmotion orchestrate setup
// const config = {
//     opacity: 1,
//     scale: 2
// }
// const childConfig = {
//     opacity: 1,
//     scale: 2
// }
// const Parent = posed.ul(config)
// const Child = posed.li(childConfig)

// const items = [1,2,3,4,5]

// ({ items }) => (
//   <Parent pose="open">
//     {items.map(item => <Child />)}
//   </Parent>
// )

const AllLists = (props) => {
  let history = useHistory()
  let [status, setStatus] = useState({})
  const userId = Auth.getUserId()

  const trashIcon = <FontAwesomeIcon icon={faTrashAlt} />

  const handleClick = (elem) => {
    history.push(`/lists/${elem.user._id}/${elem._id}`)
  }

  function archiveList(e, listId) {
    e.preventDefault()
    axios.put(`http://localhost:8000/api/lists/${userId}/${listId}`, { listStatus: 'Archived' }, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(()=>{
        props.refreshFunction()
        setStatus('Archived')
      })
      .catch(err => console.log(err))
  }

  if (props.data === undefined ) return <div>loading</div>
  return (
    <div>

      {props.data.map((ele, i) => {
        return (
          <> {ele.listStatus === 'Active' && 
          <div className='container lists' key={i}>
            <div className='columns'>
              <div className='column' onClick={() => handleClick(ele)}>
                <p className="subtitle is-5">{ele.listName}</p>
                <p>{moment(ele.eventDate).format('DD-MM-YYYY')}</p>
              </div>
              <div className='column' onClick={() => handleClick(ele)}>
                <p>Number of gifts saved: {ele.itemsSaved.length + ele.customItem.length}</p>
              </div>
              <div className='column'>
                <p onClick={((e) => archiveList(e, ele._id))}>{trashIcon}</p>
              </div>
            </div>
          </div>}
          </>
        )
      })}
    </div>
  )
}

export default AllLists