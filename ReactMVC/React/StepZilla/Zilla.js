import React, { Component } from 'react';
import StepZilla from 'react-stepzilla'
import Step1 from './Step1'
import Step2 from './Step2'
'use strict';

export default class Zilla extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() { }

    componentWillUnmount() { }

    render() {
        const steps =
            [
                { name: 'Step1', component: <Step1 /> },
                { name: 'Step2', component: <Step2 /> }
            ]

        return (
            <div className='example'>
                <div className='step-progress'>
                    <StepZilla
                        steps={steps}
                    />
                </div>
            </div>
        )
    }
}

