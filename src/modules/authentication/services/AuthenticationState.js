import { useEffect, useState } from "react";
import session from "../../../configs/session";

export default function useAuthentication() {
    const isLoggedIn = session.isLoggedIn()
    const user = session.getUser()

    return { isLoggedIn, user }
}