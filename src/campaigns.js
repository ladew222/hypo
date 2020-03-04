import React, { Component } from 'react';
import { Button } from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import Dialog from 'react-bootstrap-table-next';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import DynamicSelect from "./FilterSelector";
import axios from "axios";
import AutoComplete from "./AutoComplete";

function rankFormatter(cell, row, rowIndex, formatExtraData) {
    return (
        < div id={`${row.uid}-dropdown`}
            style={{ textAlign: "center",
                cursor: "pointer",
                lineHeight: "normal" }}>
            <a href={`/views/${row.uid}`} >{row.uid} </a>
            < div
                style={{ fontSize: 20 }}
                color="disabled"
            />
        </div>
    ); }

const arrayOfData = [
    {
        id: 'content',
        name: 'content'
    },
    {
        id: 'source',
        name: 'source'
    },
    {
        id: 'medium',
        name: 'medium'
    },
    {
        id: 'uid',
        name: 'uid'
    },
];

class Campaigns extends Component {

    constructor(props){
        super(props)

      /*  this.state = {
            filter_text: "",
            filter_type: false,

        };*/

       /* this.state = {
            selectedValue: 'Nothing selected',
            filter_text: "",
            filter_type: false,
            columns: null,
            posts:null

        };*/

        /*   this.state={
               selectedValue: 'Nothing selected'
           }*/
    }


    state = {
        products: [
            {
                pid: 1,
                pred: 'grad',
                'action_date': 1000
            },
            {
                pid: 2,
                pred: 'grad',
                'action_date': 1000
            },
            {
                pid: 4,
                pred: 'grad',
                'action_date': 1400
            },
        ],
        columns: [{
            dataField: 'uid',
            text: 'UID'
        },
            {
                dataField: 'content',
                text: 'Content',
                sort: true,
                filter: textFilter(),
            }, {
                dataField: 'view_date',
                text: 'date',
                sort: true,
            },
            {
                dataField: 'path1',
                isDummyField: true,
                text: 'other pages',
                formatter: rankFormatter,
                sort: false,
            }
            ]
    }
    handleSelectChange = (filter_txt, filter_typ, filter_mode) =>{
        /*this.setState({
            selectedValue: selectedValue
        });*/
        var getstr = "";

       this.setState({"filter_text": filter_txt});
       this.setState({"filter_type": filter_typ});
        console.log('field2')
         if (this.state.filter_type!=false && this.state.filter_text && this.state.filter_text.length>1){
             console.log(this.props.state.end_date.toISOString());
             switch(filter_typ) {
                 case 'content':
                     console.log('field4');
                     if (filter_mode==false){
                         getstr="http://localhost:3000/api/campaigns_content/"+this.props.state.start_date.toISOString()+"/"+ this.props.state.end_date.toISOString()+"/"+filter_txt;
                     }
                     else{
                         getstr="http://localhost:3000/api/campaigns_content_ex/"+this.props.state.start_date.toISOString()+"/"+ this.props.state.end_date.toISOString()+"/"+filter_txt;
                     }

                     console.log(getstr);
                     break;
                 case 'source':
                     getstr="http://localhost:3000/api/campaigns/"+this.filter;
                     break;
                 case 'medium':
                     getstr="http://localhost:3000/api/campaigns_medium/"+this.filter;
                     break;
                 case 'uid':
                     getstr="http://localhost:3000/api/campaigns/"+this.filter;
                     break;
                 default:
                     getstr="http://localhost:3000/api/campaigns/"+this.filter;
                     break;

             }
             axios.get(getstr)
                 .then(res => {
                     const posts = res.data.response;
                     this.setState({ posts });
                 });
         }


    }

    componentDidMount() {
        var getstr = "";
        const { params } = this.props.match;
      /*  if (params.uid){
            getstr="http://localhost:3000/api/campaigns/"+params.uid;
        }
        else{
            getstr="http://localhost:3000/api/campaigns/";
        }*/
        getstr="http://localhost:3000/api/campaigns/";
        axios.get(getstr)
            .then(res => {
                const posts = res.data.response;
                this.setState({ posts });
            });
    }

    render() {

        if ( !this.state.posts) {
            // Note that you can return false it you want nothing to be put in the dom
            // This is also your chance to render a spinner or something...
            return <div>The responsive it not here yet!</div>
        }

        if ( this.state.posts.length === 0 ) {
            return <div>No result found </div>;
        }

        return (
            <div>
                <DynamicSelect arrayOfData={arrayOfData} start_date={this.props.state.start_date} end_date={this.props.state.end_date} onSelectChange={this.handleSelectChange} />
            <div className="container" style={{ marginTop: 50 }}>
                <span className="badge badge-default">{this.state.posts.length} Records</span>
                <BootstrapTable
                    filter = { filterFactory() }
                    striped
                    filterPosition="top"
                    bootstrap4 = {true}
                    hover
                    keyField='pid'
                    data={ this.state.posts }
                    columns={ this.state.columns } >
                </BootstrapTable>
            </div>
            </div>
        );

    }
}

export default Campaigns;

