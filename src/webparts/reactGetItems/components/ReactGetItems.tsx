import * as React from 'react';
import * as jquery from 'jquery'; 
import styles from './ReactGetItems.module.scss';
import { IReactGetItemsProps } from './IReactGetItemsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IReactGetItemsState } from './IReactGetItemsState';

export default class ReactGetItems extends React.Component<IReactGetItemsProps, IReactGetItemsState> {
 public constructor(props: IReactGetItemsProps, state: IReactGetItemsState){  
      super(props);  
      this.state = { 
      status: 'Ready',   
      items: []  
    };  
  } 
  public componentDidMount(){
    //debugger; 
    var reactHandler = this;  
    //alert("did mount:"+this.props.siteurl)
    jquery.ajax({ 
        url: `${this.props.siteurl}/_api/web/lists/getbytitle('Employee')/items`,  
        type: "GET",  
        headers:{'Accept': 'application/json; odata=verbose;'},  
        success: function(resultData) { 
          alert("success:"+resultData.d.results);
          console.log(resultData.d.results); 
          reactHandler.setState({  
            items: resultData.d.results  
           
            
          });  
          /*if(resultData.d.results > 0)
          {
            resultData.d.results.forEach(function(item)
            alert(item.Author.Title);
            )
          }*/
        },  
        error : function(jqXHR, textStatus, errorThrown) {  
        }  
    });  
  }  
  public render(): React.ReactElement<IReactGetItemsProps> {
    return (  
      
       <div className={styles.panelStyle} > 
         <br></br>
  
         <br></br> 
         <div className={styles.tableCaptionStyle} > Demo : Retrieve SharePoint List Items using SPFx , REST API  & React JS  </div>
         <br></br>
          <div className={styles.headerCaptionStyle} > Employee Details</div>
         <div className={styles.tableStyle} >   
           
           <div className={styles.headerStyle} >  
             <div className={styles.CellStyle}> ID</div>  
             <div className={styles.CellStyle}>Title</div>  
             <div className={styles.CellStyle}>EMP Name </div>
             <div className={styles.CellStyle}>EMP Number </div>
             <div className={styles.CellStyle}>Created</div> 
             <div className={styles.CellStyle}>Created By</div>   
                     
           </div>  
           
             {this.state.items.map(function(item,key){  
               
               return (<div className={styles.rowStyle} key={key}> 
                   <div className={styles.CellStyle}>{item.Id}</div> 
                   <div className={styles.CellStyle}>{item.Title}</div>  
                   <div className={styles.CellStyle}>{item.EName}</div>
                   <div className={styles.CellStyle}>{item.ENum}</div>
                   <div className={styles.CellStyle}>{item.Created}</div>
                   <div className={styles.CellStyle}>{item.EditorId}</div>
                   
                  {/* <div className={styles.CellStyle}>{item.Created By}</div>
                   <div className={styles.CellStyle}>{item.Modified}</div>
                   <div className={styles.CellStyle}>{item.Modified By}</div> */}
                 </div>);  
             })}                      
         </div>  
       </div>  
   );  
 }  
}
