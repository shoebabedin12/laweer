import toast from "react-hot-toast";


type Lawyer = {
   id: string;
  name: string;
  specialty?: string;
};

const getAppointment = ()=>{
    const getLawyer = localStorage.getItem('appointed');
    if(getLawyer){
        return JSON.parse(getLawyer);
    }else{
        return [];
    }

}

const addAppointment = (lawyer: Lawyer) =>{
    const appointment = getAppointment()
    const isExist = appointment.find((app: Lawyer)  => app.id === lawyer.id)

    if(isExist){
        toast.error('Appointment already Schedule for today')
       return isExist;
    }
    appointment.push(lawyer)
    localStorage.setItem('appointed', JSON.stringify(appointment));

}

const removeAppointment = (id: string) =>{
    const appointment = getAppointment()
    const remainingAppointment = appointment.filter((appoint: Lawyer) => appoint.id !== id)
    toast.error('Appointment Cancel!!!')
    localStorage.setItem('appointed', JSON.stringify(remainingAppointment));

}


export{
    addAppointment, getAppointment, removeAppointment
}