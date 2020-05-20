import React from 'react';
import { Button, Container, Field, Control, Label, Select } from "rbx";
import { useState } from 'react';
import cuisine from '../shared/data';
import { useForm , ErrorMessage} from 'react-hook-form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import {storage, firebase} from '../shared/firebase';
import tags from '../shared/tags';
import ImageUploader from 'react-images-upload';


const db = firebase.database();


const EditEvent = (props) => {
    
    const date1 = props["date"]
    const year = date1.split("-")[0]
    const month = date1.split("-")[1] 
    const dayW = date1.split("-")[2]
    const day = new Date(parseInt(year), parseInt(month)-1, parseInt(dayW))
    const [date, setDate] = useState(day);

    const name = props["resname"] 
    const id = props["id"]
    const description1 = props["description"]
    const tag = props["tag"]
    const size1 = props["groupSize"]
    const cuisine1 = props["cuisine"]   
    const time1 = props["time"]
    const start = time1.split("-")[0]
    const end = time1.split("-")[1]
    const url1 = props['url']


    const [RestName,setRestName] = useState(name);
    const [desc, setDescription] = useState(description1)
    const [cuis, setCuisine] = useState(cuisine1)
    const [tag1, setTag] = useState(tag)
    const [groups, setGroupSize] = useState(size1)
    const [times, setTime1] = useState(time1)
    const [url, setURL] = useState("");


    const startH = start.split(":")[0]
    const startM = start.split(":")[1]
    const endH = end.split(":")[0]
    const endM = end.split(":")[1]

    const starts = moment().hour(parseInt(startH)).minute(parseInt(startM));
    const ends = moment().hour(parseInt(endH)).minute(parseInt(endM));
    

    const [pictures, setPictures] = useState([]);
    const [time, setTime] = useState();

    const { register, handleSubmit, errors, setValue} = useForm(); 

    const onSubmit = (data) =>{
        if (url != ""){
            db.ref("events/" + id + "/imageURL").set(url)
        }

        if (data["restaurant-name"] !== name){
            db.ref("events/" + id + "/name").set(data["restaurant-name"])}

        if (data["cuisine"] !== cuisine1){
            db.ref("events/" + id + "/cuisine").set(data["cuisine"])}
        

        if (data["description"] !== description1){
            db.ref("events/" + id + "/description").set(data["description"])}
        
        if (data["tag"] !== tag){
            db.ref("events/" + id + "/tag").set(data["tag"])}
        
        const peop = size1.split('/')[0]
        if (data["party-size"] !== size1){
            db.ref("events/" + id + "/group-size").set(peop +"/"+data["party-size"])}
        
        var time_start = start;
        var time_end = end

        if (data["time-start"] !== starts) {
            time_start = String(data["time-start"]["_d"]);
            var arr = time_start.split(" ");
            time_start = arr[4].substring(0, 5);
            
        }
                
        if (data["time-end"] !== ends) {
            time_end = String(data["time-end"]["_d"]);
            var arr = time_end.split(" ");
            time_end = arr[4].substring(0, 5);

        }
        const time_string = time_start +"-"+ time_end
        if (time_string !== time1) {
            db.ref("events/" + id + "/time").set(time_string)}

        var date = data["date"];
        if (!moment.isMoment(date)){     
            date = date.toISOString().substring(0, 10);
            db.ref("events/" + id + "/date").set(date)
            
        }
        else{
            var nowdate = date["_d"]            
            nowdate = nowdate.toISOString().substring(0, 10);             
            db.ref("events/" + id + "/date").set(nowdate)
        }
    }  
    

    React.useEffect(() => {
        register({ name: "date" }, { required: true });
        register({ name: "time-start" }, { required: true });
        register({ name: "time-end" }, { required: true });
        setValue("time-start", starts)
        setValue("time-end", ends)        
    }, []);

    

    const party_size = [];

    for (var i = 1; i <= 30; i++) { 
        party_size.push( 
            <Select.Option key={i}> {i} </Select.Option>
    )}


    return (

        <Container>
            <ul className='popup_create'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <li >
                        <Field horizontal={true}>
                            <Field.Label> <Label> Restaurant Name </Label>
                                <textarea defaultValue={props["resname"]} type="text" name="restaurant-name" ref={register({ required: true })}
                                onChange = {val => {
                                    setRestName(val);
                                }}/> 
                                <ErrorMessage errors={errors} name="restaurant-name" message="This is required" />
                            </Field.Label>

                        </Field>
                    </li>

                    <li>
                        <Field horizontal={true}>
                            <Field.Label> <Label> Cuisine </Label>
                                <Control expanded={true}>
                                    <Select.Container fullwidth={true}>
                                        <Select defaultValue = {props["cuisine"]} name="cuisine" ref={register} 
                                        onChange = {val =>{
                                            setCuisine(val);
                                        }}>
                                            {Object.values(cuisine).map(value =>
                                                <Select.Option key={value}> {value} </Select.Option>)
                                            }
                                        </Select>
                                    </Select.Container>
                                </Control>
                            </Field.Label>
                        </Field>
                    </li>

                    <li>
                        <Field horizontal={true}>
                            <Field.Label> <Label> Tags </Label>
                                <Control expanded={true}>
                                    <Select.Container fullwidth={true}>
                                        <Select defaultValue={tag} name="tag" ref={register}
                                        onChange = {val =>{
                                            setTag(val)
                                        }}>
                                            {Object.values(tags).map(value =>
                                                <Select.Option key={value}> {value} </Select.Option>)
                                            }
                                        </Select>
                                    </Select.Container>
                                </Control>
                            </Field.Label>
                        </Field>
                    </li>
                    <li>
                        <Field horizontal={true}>
                            <Field.Label> <Label> Date </Label>
                                <Control expanded={true}>
                                    <DatePicker

                                        isClearable
                                        selected={date}
                                        onChange={val => {
                                            setDate(val);
                                            setValue("date", val);// Here we are setting the value for the registered input.
                                        }}
                                    />
                                    <ErrorMessage errors={errors} name="date" message="This is required" />
                                </Control>
                            </Field.Label>

                        </Field>
                    </li>
                    <li>
                        <Field horizontal={true}>
                            <Field.Label> <Label> Time Start </Label>
                                <Control expanded={true}>
                                    <TimePicker
                                        defaultValue={starts}
                                        showSecond={false}
                                        inputReadOnly
                                        onChange={val => {
                                            setTime(val);
                                            setValue("time-start", val);// Here we are setting the value for the registered input.
                                            setTime1(val)
                                        }}
                                         
                                    />
                                    <ErrorMessage errors={errors} name="time-start" message="This is required" />
                                </Control>
                            </Field.Label>
 
                        </Field>
                    </li>

                    <li>
                        <Field horizontal={true}>
                            <Field.Label> <Label> Time End </Label>
                                <Control expanded={true}>
                                    <TimePicker
                                        defaultValue={ends}
                                        showSecond={false}
                                        inputReadOnly
                                        onChange={val => {
                                            setTime(val);
                                            setValue("time-end", val);// Here we are setting the value for the registered input.
                                            setTime1(val)
                                        }}
                                    />
                                    <ErrorMessage errors={errors} name="time-end" message="This is required" />
                                </Control>
                            </Field.Label>

                        </Field>
                    </li>
                    {/* {size1.split('/')[0]} */}

                    <li>
                        <Field horizontal={true}>
                            <Field.Label> <Label> Party Size </Label>
                                <Control expanded={true}>

                                    <Select.Container fullwidth={true}>
                                        <Select defaultValue={size1.split('/')[1]} name="party-size" ref={register}
                                        onChange={val => {
                                            setGroupSize(val);
                                        }}>
                                            {party_size}
                                        </Select>
                                    </Select.Container>

                                </Control></Field.Label>

                        </Field>
                    </li>

                    <li>
                        <Field horizontal={true}>
                            <Field.Label> <Label> Description </Label>
                                <textarea defaultValue={description1} type="text" name="description" ref={register}
                                onChange = {val =>{
                                    setDescription(val);
                                }} />
                            </Field.Label>
                        </Field>
                    </li> 

                    <ImageUploader
                        {...props}
                        withIcon={true}
                        withPreview={true}
                        onChange={(picture) => {
                            var tmp = pictures.concat(picture);
                            setPictures(tmp);

                            // upload images to storage
                            const path = `img/${picture[0].name}`;
                            const uploadTask = storage.ref( path ).put(picture[0]);
                            uploadTask.on('state_changed',
                                (snapshot) => {
                                    // progress function ....
                                },
                                (error) => {
                                    // error function ....
                                    console.log(error);
                                },
                                () => {
                                    // complete function ....
                                    storage.ref('img').child(picture[0].name).getDownloadURL().then(url => {
                                        setURL(url);
                                    }
                                    )
                                });

                        }}
                        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                        maxFileSize={5242880}
                    >

                        {
                            pictures.map( picture =>
                                <div> {picture.name} </div>
                            )
                        }

                    </ImageUploader>

                    <Button type="submit" color="info" size = "large"> submit </Button>
                    
                </form>
            </ul>
         
        </Container>


    );
};


export default EditEvent;

