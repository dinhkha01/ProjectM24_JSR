import { Avatar, Card } from 'antd'
import React from 'react'

const MenuR = () => {
  return (
    <div>
      <Card title="Stories">
            <Avatar.Group>
              <Avatar src="https://via.placeholder.com/40x40" />
              <Avatar src="https://via.placeholder.com/40x40" />
              <Avatar src="https://via.placeholder.com/40x40" />
              <Avatar src="https://via.placeholder.com/40x40" />
            </Avatar.Group>
          </Card>
          <Card title="Suggestions" style={{ marginTop: 16 }}>
            <p>User 1</p>
            <p>User 2</p>
            <p>User 3</p>
          </Card>
    </div>
  )
}

export default MenuR
