import { useState, useContext, useEffect, Component } from "react";
import { database } from "../firebase";
import { ref, onValue, get } from "firebase/database";
import { AuthContext } from "../store/auth-context";
import LeaveOutput from "../components/LeaveOutput/LeaveOutput";

function EditLeave() {
    const [leaveItems, setLeaveItems] = useState();
    const [userEmail, setUserEmail] = useState();
    const authCtx = useContext(AuthContext);
    const fetchData = async (leaveItemsRef) => {
        const snapshot = await get(leaveItemsRef);
        const data = snapshot.val() || {};
        setLeaveItems(data);
        return data;
    };

    useEffect(() => {
        const fullEmail = authCtx.email;
        const userEmail = fullEmail.split(".").join("");

        const leaveItemsRef = ref(database, userEmail);
        fetchData(leaveItemsRef);
        setUserEmail(leaveItemsRef._path.pieces_[0])
    }, []);
    
    return <LeaveOutput userEmail={userEmail} leave={leaveItems} fallbackText="No leave booked" />;
}

export default EditLeave;
