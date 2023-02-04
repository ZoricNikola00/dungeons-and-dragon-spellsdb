import bg from '../images/bg.avif'
const Background = () => {
  return (
    <>
        <div className='fixed top-0 left-0 w-full h-full bg-black/70 -z-10'/>
        <img src={bg} alt='background' className='fixed w-full top-0 left-0 h-full object-cover -z-20'/>
    </>
  )
}

export default Background