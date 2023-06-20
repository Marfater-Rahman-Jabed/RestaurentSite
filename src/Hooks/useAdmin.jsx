import { useEffect, useState } from "react";

const useAdmin = email => {

    const [Admin, setAdmin] = useState('')
    const [adminLoading, setAdminLoading] = useState(true)

    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/alluser/admin/${email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    // localStorage.setItem('accessToken', data.isAdmin)
                    // console.log(data.accessToken)
                    setAdmin(data.isAdmin)
                    setAdminLoading(false)
                })
        }
    }, [email])

    return [Admin, adminLoading];
}

export default useAdmin;