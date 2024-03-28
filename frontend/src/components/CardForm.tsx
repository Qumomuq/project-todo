import React, {useState} from 'react';
import {TCard} from "@/types/types";
import {useRouter} from "next/router";
import {post} from "@/hooks/fetcher";
import {mark as markArray, priority as priorityArray} from "@/store/localstore";
import {useUpdateEffect} from "@/hooks/useUpdateEffect";

interface CardItemProps {
    card: TCard ;
    option: string | undefined;
    action:  React.Dispatch<React.SetStateAction<boolean>> | undefined;
    data:  React.Dispatch<React.SetStateAction<TCard>> | undefined ;
}
const CardForm: React.FC<CardItemProps> = ( {card, option = 'POST', action = null, data = null} ) => {
    const [name, setName] = useState<string>(card?.name || '')
    const [priority, setPriority] = useState<string>(card?.priority || 'low')
    const [description, setDescription] = useState<string>(card?.description || '')
    const [mark, setMark] = useState<string[]>(card?.mark || []);
    const [errors, setErrors] = useState<any>({
        name: undefined,
        description: undefined
    });
    const router = useRouter()

    useUpdateEffect(() => {
        validateName();
    }, [name]);
    useUpdateEffect(() => {
        validateDescription();
    }, [description]);
    // Validate form
    const validateName = () => {
        if (!name) {
            setErrors((prevState: any) => ({...prevState, name: 'Name is required.'}))
        } else if (name.length < 5) {
            setErrors((prevState: any) => ({...prevState,  name: 'Name must be at least 5 characters.'}))
        } else setErrors((prevState: any) => ({...prevState,  name: false}))
    }
    const validateDescription = () => {
        if (!description) {
            setErrors((prevState: any) => ({...prevState,  description:  'Email is required.'}))
        } else setErrors((prevState: any) => ({...prevState,  description: false }))
    }
    const validateForm = () => {
        setErrors({...errors})
        validateDescription()
        validateName()
        return Object.keys(errors).every((val, i, arr) => errors[val] === false)
    };
    const editMark= (target) => {

        if (target.checked) {
            setMark([...mark, target.value])
        } else {
            setMark(mark.filter((value) => value !== target.value))
        }
    }

    const submit = (e) => {
        if(validateForm()) {
            post(name, mark, priority, description, card?._id, option).then(async (res) => {
                const value = await res.json()
                if(option === "POST") router.push(`/card/${value._id}`)
                if(action) action(false)
                if(data) data(value)
            })
        }
    }

    return (
        <>
            <form className={"container"}>
            <div className={"group"}>
                <label className={"label"} htmlFor={"name"}>Название задачи</label>
                <input name={"name"} defaultValue={name}
                       onChange={(e) => {setName(e.target.value)}}
                       type={"text"} className={"input inputName"}/>
                {errors.name ? <span>{errors.name}</span> : null}
            </div>
            <div className={"group"}>
                <label className={"label"} htmlFor={"priority"}>Приоритет</label>
                <select name={"priority"} className={"input select"} defaultValue={priority} onChange={(e) => {setPriority(e.target.value)}}>
                    {priorityArray.map((value: string) => (
                        <option key={value} value={value}>{value}</option>
                    ))}
                </select>
            </div>
            <div className={"group"}>

                <label className={"label"}>Отметки</label>
                <div className={"group-checkbox"}>
                    {markArray.map((value: string) => (
                        <label className={"group-row checkbox-full label"}>
                            <input type={"checkbox"} defaultValue={value} defaultChecked={card?.mark.includes(value)} onChange={(e) => {
                                editMark(e.target)
                                }} name={value}/>
                            <span>{value}</span>
                        </label>
                    ))}
                </div>
            </div>
                <div className={"group"}>
                    <label className={"label"} htmlFor={"description"}>Описание</label>
                    <textarea name={"description"} defaultValue={description} onChange={(e) => {
                        setDescription(e.target.value)
                    }} className={"input textareaDescription"}/>
                    {errors.description ? <span>{errors.description}</span> : null}

                </div>
                <button type={"button"} onClick={(e) => {submit(e)}} className={"button button-large button-blue"}>Сохранить</button>
            </form>
        </>
    );
};

export default CardForm;