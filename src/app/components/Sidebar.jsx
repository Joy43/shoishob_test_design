
import { FaEye, FaHeart } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi'

const Sidebar = () => {
  return (
    <div className='sidebar'>
<button className='sidebarButton'>
       
   <FiShoppingCart className='text-gray-400'/>
</button>
<button className='sidebarButton'>
       
   <FaHeart className='text-gray-400'/>
</button>
<button className='sidebarButton'>
       
   <FaEye className='text-gray-400'/>
</button>

    </div>
  )
}

export default Sidebar;