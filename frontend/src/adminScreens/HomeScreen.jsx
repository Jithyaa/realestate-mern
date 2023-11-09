import { Container, Card, Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import '../AdminCss/homeScreen.css';
import {toast} from "react-toastify";
import AdminSideBar from '../components/AdminSideBar/AdminSideBar.jsx';
import axios from '../axioss'

const AdHomeScreen = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openModal, setOpenModal] = useState(false)
  const [owner, setOwner] = useState([])

  useEffect(() => {
    axios.get("/admin/user").then((response) => {
      setUsers([...response.data]);
    }).catch((error) => {
      console.log(error);
    });
  }, []);
  console.log(users)
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  const toggleUserBlockStatus = async (userId, isBlocked) => {
    if (!userId) {
      throw new Error('UserId is required');
    }

    try {
      const response = await axios.put(`/admin/${isBlocked ? 'unblock' : 'block'}/${userId}`);
      if (response.status === 200) {
        console.log(response.data.message);
        // Update the user list after successful block/unblock
        setUsers(users.map(user => user._id === userId ? { ...user, blocked: !isBlocked } : user));
      } else {
        console.error('Error toggling user block status:', response.data);
      }
    } catch (error) {
      console.error('Error toggling user block status:', error);
    }
  };


  function formatLargeNumber(number) {
    if (number >= 10000000) {
      return (number / 10000000).toFixed(1) + ' Cr';
    } else if (number >= 100000) {
      return (number / 100000).toFixed(1) + ' Lakh';
    } else {
      return number.toString();
    }
  }


  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log("🥶🥶🥶🥶🥶🥶🥶🥶",openModal);
  return (
   <div>
    <AdminSideBar/>
    <Container style={{marginRight:'5rem'}} >
    
      <Card style={{ marginTop: '4rem', backgroundColor:'#f9f9f994'}}>
      
        <Card.Body>
          <h2><b>User List</b></h2>
          <div style={{ display: 'flex', justifyContent: 'end', marginBottom: '0rem' }}>
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Number</th>
                <th>Action</th>
                <th>Property List</th>


                {/* Add more table headings as needed */}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.number}</td>
                  <td>
                    <button
                      onClick={() => toggleUserBlockStatus(user._id, user.blocked)}
                      style={{
                        color: user.blocked ? '#28a745' : '#dc3545',
                        border: `1px solid ${user.blocked ? '#28a745' : '#dc3545'}`,
                        padding: '8px 16px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        background: 'none',
                      }}
                    >
                      {user.blocked ? 'Unblock' : 'Block'}
                    </button>
                  </td>
                  <td>
                    {/* <a href="properties-list"> */}
                    <button
                      style={{
                        color: 'green',
                        cursor: 'pointer',
                        background: 'none',
                        border: '1px solid green'
                      }}
                      onClick={async () => {
                        let { data } = await axios.get("/admin/owner-fetching", {
                          params: {
                            id: user._id
                          }
                        })
                        setOwner(data)
                        
                        setOpenModal(true)
                      }}
                    >Show list</button>
                    {/* </a> */}
                  </td>
                </tr>
              ))}

            </tbody>

          </Table>
        </Card.Body>
      </Card>


      {
        openModal &&
        <div className="modal-parent" style={{ position: "fixed", width: "100vw", height: "130vh", zIndex: "22", backgroundColor: "#463939ad", top: "0", left: "0", display: "grid", placeItems: "center" }}>
          <i className="fa-solid fa-xmark" style={{ position: "absolute", top: "4rem", right: "4rem", fontSize: "2rem", color: "white", cursor: "pointer" }} onClick={() => setOpenModal(false)}></i>
          <div className="modal-child" style={{ backgroundColor: "white", width: "80%", padding: "20px", height: "50%", borderRadius: "12px", overflowY: "scroll", display: "flex", flexDirection: "column", gap: "1rem" }} >
            <div className="modal-heading"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "12px",

                borderRadius: "12px",
                justifyContent: "center"
              }}
            >
              <div className="image">Image</div>
              <div className="title">Title</div>
              <div className="price">Price</div>
              <div className="address">Address</div>
              <div className="city">City</div>
              <div className="country">Country</div>
              <div className="actions-modal">Actions</div>
            </div>
            {owner.length > 0 ? (
      owner.map((ele, index) => (
        <div key={index} className="modal-card" style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          padding: "12px",
          border: "2px solid green",
          borderRadius: "12px",
          justifyContent: "center"
        }}>
          <div className="image">
            {ele.images.length > 0 && ele.images.map((im, ind) => (
              <img key={ind} src={im} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
            ))}
          </div>
          <div className="title">{ele.title}</div>
          <div className="price">₹  {formatLargeNumber(ele.price)}</div>
          <div className="address">{ele.address}</div>
          <div className="city">{ele.city}</div>
          <div className="country">{ele.country}</div>
          <div className="actions-modal">
            {ele.unList ? 
              <button  style={{backgroundColor:"green"}} onClick={async()=>{
                let response = await axios.post("/admin/prop-list",{
                  id:ele._id
                })
                if(response.data.error) toast.error(response.data.error)
                toast.success(response.data.success)
                setOpenModal(false)
              }}>List</button> :
              <button onClick={async()=>{
                let response = await axios.post("/admin/prop-unlist",{
                  id:ele._id
                })
                if(response.data.error) toast.error(response.data.error)
                toast.success(response.data.success)
                setOpenModal(false)
              }}>Unlist</button>
            }
          </div>
        </div>
      ))
    ) : (
      "No Data"
    )}


          </div>
        </div>
      }
    </Container>
    </div>
  );
};

export default AdHomeScreen;