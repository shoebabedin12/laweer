import toast from "react-hot-toast";

const getAppointment = ()=>{
    const getLawyer = localStorage.getItem('appointed');
    if(getLawyer){
        return JSON.parse(getLawyer);
    }else{
        return [];
    }

}

const addAppointment = lawyer =>{
    const appointment = getAppointment()
    const isExist = appointment.find(app => app.id === lawyer.id)

    if(isExist){
        toast.error('Appointment already Schedule for today')
       return isExist;
    }
    appointment.push(lawyer)
    localStorage.setItem('appointed', JSON.stringify(appointment));

}

const removeAppointment = id =>{
    const appointment = getAppointment()
    const remainingAppointment = appointment.filter(appoint => appoint.id !== id)
    toast.error('Appointment Cancel!!!')
    localStorage.setItem('appointed', JSON.stringify(remainingAppointment));

}


export{
    addAppointment, getAppointment, removeAppointment
}