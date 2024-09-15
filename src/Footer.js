const Footer = ({length}) => {
  return (
    <footer>
        <p>{ length === 1 ? length +' List Item' : length+" List Items"  } </p>
    </footer>
  )
}

export default Footer