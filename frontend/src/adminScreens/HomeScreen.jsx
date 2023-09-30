import { Container, Card, Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';


const AdHomeScreen = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/user").then((response) => {
        setUsers([...response.data]); 
    }).catch((error)=>{
      console.log(error);
    });
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  const toggleUserBlockStatus = async (userId, isBlocked) => {
    if (!userId) {
      throw new Error ('UserId is required');
    }
  
    try {
      const response = await axios.put(`http://localhost:5000/api/admin/${isBlocked ? 'unblock' : 'block'}/${userId}`);
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
  

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container >
      <Card>
        <Card.Body>
          <h2>User List</h2>
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
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Number</th>
                <th>Action</th>


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
                </tr>
              ))}

            </tbody>

          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdHomeScreen;