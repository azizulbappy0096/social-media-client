import React from 'react'

import { Sidebar, List, Image, Icon } from 'semantic-ui-react'

function PeopleSideBar() {
    return (
        <Sidebar className="contact__sidebar"
        direction="left"
        visible
        verticalAlign>
            <div className="peopleBar">
            <h5>
                People you may know
            </h5>
            <List className="peopleBar__list" selection verticalAlign="middle">
        <List.Item>
          <Image
            avatar
            src="https://react.semantic-ui.com/images/avatar/small/helen.jpg"
          />
          <List.Content>
            <List.Header>Helen</List.Header>
          </List.Content>
        </List.Item>
        <List.Item>
          <Image
            avatar
            src="https://react.semantic-ui.com/images/avatar/small/christian.jpg"
          />
          <List.Content>
            <List.Header>Christian</List.Header>
          </List.Content>
        </List.Item>
        <List.Item>
          <Image
            avatar
            src="https://react.semantic-ui.com/images/avatar/small/daniel.jpg"
          />
          <List.Content>
            <List.Header>Daniel</List.Header>
          </List.Content>
        </List.Item>
        <List.Item>
          <Image
            avatar
            src="https://react.semantic-ui.com/images/avatar/small/daniel.jpg"
          />
          <List.Content>
            <List.Header>Daniel</List.Header>
          </List.Content>
        </List.Item>
        <List.Item>
          <Image
            avatar
            src="https://react.semantic-ui.com/images/avatar/small/daniel.jpg"
          />
          <List.Content>
            <List.Header>Daniel</List.Header>
          </List.Content>
        </List.Item>
        
        
      </List>
            </div>
        </Sidebar>
    )
}

export default PeopleSideBar
