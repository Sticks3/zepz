import React, {useState} from "react";
import {Skeleton, List, Avatar} from 'antd';
import {CollapsableTable} from './components/CollapsableTable';

const App = () => {

  const [error, setError] = useState<string>();

  const container = {
    margin: '5%',
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  return (<div style={container}>
        {error ?
            <div>
              Error: {JSON.stringify(error)}
              <br/>
              <br/>
              <Skeleton active avatar>
                <List.Item.Meta
                    avatar={<Avatar />}
                    title=''
                    description=''
                />
              </Skeleton>
            </div> :
            <CollapsableTable onError={handleError}/>
        }
      </div>
  )
};

export default App;