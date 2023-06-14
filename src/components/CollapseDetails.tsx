import React from 'react';
import {Checkbox} from 'antd';
import {CheckboxChangeEvent} from 'antd/es/checkbox';

export const CollapseDetails = ({onFollow, onBlock}: {
    onFollow: (event: CheckboxChangeEvent) => void;
    onBlock: (event: CheckboxChangeEvent) => void
}) => {

    const handleFollow = (event: CheckboxChangeEvent) => {
        onFollow(event);
    };

    const handleBlock = (event: CheckboxChangeEvent) => {
        onBlock(event);
    };


    return (
        <div>
            <Checkbox onChange={handleFollow}>Follow</Checkbox>
            <Checkbox onChange={handleBlock}>Block</Checkbox>
        </div>
    )
}