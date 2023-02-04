import {useParams} from 'react-router-dom'

const Spell = () => {
    const {id}=useParams()
    console.log(id)
  return (
    <div>Spell</div>
  )
}

export default Spell