import React from 'react';
import { Button, Container, Field, Control, Label, Select } from "rbx";
import { useState } from 'react';
import Restaurant from "./Restaurant";
import cuisine from '../shared/data';
import ImageUploader from 'react-images-upload';
import { useForm, ErrorMessage } from 'react-hook-form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import tags from '../shared/tags';
import { storage, firebase } from '../shared/firebase'
import { confirmAlert } from 'react-confirm-alert';


function myFunction() {
    var x = document.getElementById("create_event_popup");

    x.style.display = "none";
    
}

const CreateEvent = (host, props) => {

    const [pictures, setPictures] = useState([]);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(moment());
    const [url, setURL] = useState("");

    const now = moment();

    const { register, handleSubmit, errors, setValue } = useForm(); // initialise the hook
    const onSubmit = data => {
        confirmAlert({
            title: 'Confirm to create this event',
            message: 'Are you sure to do this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        setTimeout(() => {
                            console.log("World!");
                            console.log("before submit", url);
                            var time_start = "00:00";
                            if (data["time-start"] != undefined) {
                                time_start = String(data["time-start"]["_d"]);
                                var arr = time_start.split(" ");
                                time_start = arr[4].substring(0, 5);
                            }
                            var time_end = "00:00";
                            if (data["time-end"] != undefined) {
                                time_end = String(data["time-end"]["_d"]);
                                var arr = time_end.split(" ");
                                time_end = arr[4].substring(0, 5);
                            }
                            var date = data["date"];
                            date = date.toISOString().substring(0, 10);
                            var name = host["name"]["name"]["displayName"];

                            const item = {
                                "cuisine": data["cuisine"],
                                "date": date,
                                "host": name,
                                "group-size": "1/" + data["party-size"],
                                "time": time_start + "-" + time_end,
                                "id": "",
                                "name": data["restaurant-name"],
                                "imageURL": url,
                                "description": data["description"],
                                "people": [name],
                                "tag": data["tag"]
                            };
                            console.log(item);
                            const itemsRef = firebase.database().ref('events');
                            const key = itemsRef.push(item).key;
                            const editRef = firebase.database().ref("events/" + key + "/id");
                            editRef.set(key)
                                .then(() => {
                                    alert("Event is successfully created!");
                                    window.location.reload(false);
                                    console.log("World!");
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        }, 1000);
                    }
                },
                {
                    label: 'No'
                }
            ]
        });
        document.getElementById("create_event_popup").style.display = "none";


    };

    // You can also register inputs manually, which is useful when working with custom components
    // and Ref is not accessible. This is actually the case when you are working with React Native or
    // custom component like react-select.
    // By using a custom register call, you will need to update the input value with setValue,
    // because input is no longer registered with its ref.
    React.useEffect(() => {
        register({ name: "date" }, { required: true });
        register({ name: "time-start" }, { required: true });
        register({ name: "time-end" }, { required: true });
    }, []);

    const party_size = [];

    for (var i = 1; i <= 30; i++) {
        party_size.push(
            <Select.Option key={i}> {i} </Select.Option>
            // <li key={index}>{value}</li>
        )
    }


    return (

        <Container>
            <ul className='popup_create'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <li >
                        <Field horizontal={true}>
                            <Field.Label> <Label> Restaurant Name </Label>
                                <textarea type="text" name="restaurant-name" ref={register({ required: true })} />
                                <ErrorMessage errors={errors} name="restaurant-name" message="This is required" />
                            </Field.Label>

                        </Field>
                    </li>

                    <li>
                        <Field horizontal={true}>
                            <Field.Label> <Label> Cuisine </Label>
                                <Control expanded={true}>
                                    <Select.Container fullwidth={true}>
                                        <Select name="cuisine" ref={register}>
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
                                        <Select name="tag" ref={register}>
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
                                        defaultValue={now}
                                        showSecond={false}
                                        inputReadOnly
                                        onChange={val => {
                                            setTime(val);
                                            setValue("time-start", val);// Here we are setting the value for the registered input.
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
                                        defaultValue={now}
                                        showSecond={false}
                                        inputReadOnly
                                        onChange={val => {
                                            setTime(val);
                                            setValue("time-end", val);// Here we are setting the value for the registered input.
                                        }}
                                    />
                                    <ErrorMessage errors={errors} name="time-end" message="This is required" />
                                </Control>
                            </Field.Label>

                        </Field>
                    </li>


                    <li>
                        <Field horizontal={true}>
                            <Field.Label> <Label> Party Size </Label>
                                <Control expanded={true}>

                                    <Select.Container fullwidth={true}>
                                        <Select name="party-size" ref={register}>
                                            {party_size}
                                            {/*<Select.Option> Small </Select.Option>*/}
                                            {/*<Select.Option> Medium </Select.Option>*/}
                                            {/*<Select.Option> Large </Select.Option>*/}
                                        </Select>
                                    </Select.Container>

                                </Control></Field.Label>

                        </Field>
                    </li>

                    <li>
                        <Field horizontal={true}>
                            <Field.Label> <Label> Description </Label>
                                <textarea type="text" name="description" ref={register} />
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
                            console.log(picture);

                            // upload images to storage
                            const path = `img/${picture[0].name}`;
                            console.log(path);
                            const uploadTask = storage.ref(path).put(picture[0]);
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
                                        console.log(url);
                                        setURL(url);
                                    })
                                });

                        }}
                        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                        maxFileSize={5242880}
                    >

                        {
                            pictures.map(picture =>
                                <div> {picture.name} </div>
                            )
                        }

                    </ImageUploader>

                    {/* <Button type="submit" color="info" onclick={() => myFunction()}> submit </Button> */}
                    <Button type="submit" color="info"> submit </Button>
                </form>

            </ul>


        </Container>



    );
};


export default CreateEvent;
