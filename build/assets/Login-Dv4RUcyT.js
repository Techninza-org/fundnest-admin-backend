import { r as c, _ as g, R as N, c as f, d as y, P as d, u as w, j as s, C as v, e as m, f as b, g as I, h as L } from "./index-DZwZ83nM.js"; import { C as p, a as h, b as u, c as x, d as C } from "./CRow-DttuQA3f.js"; import { C as S, a as k } from "./CCardBody-BtuBX7bF.js"; import { C as R, c as G } from "./cil-user-CnPfvFwI.js"; var l = c.forwardRef(function (a, r) { var n = a.children, o = a.className, t = g(a, ["children", "className"]); return N.createElement("div", f({ className: y("card-group", o) }, t, { ref: r }), n) }); l.propTypes = { children: d.node, className: d.string }; l.displayName = "CCardGroup"; const U = () => { const a = w(), [r, n] = c.useState(""), [o, t] = c.useState(""); async function j() { try { const e = { username: r, password: o }, i = await L.post("http://localhost:4000/admin/login", e); localStorage.setItem("user", JSON.stringify(i.data.user)), localStorage.setItem("token", i.data.token), a("/dashboard") } catch { alert("Login Failed!") } } return s.jsx("div", { className: "bg-body-tertiary min-vh-100 d-flex flex-row align-items-center", children: s.jsx(v, { children: s.jsx(p, { className: "justify-content-center", children: s.jsx(h, { md: 8, children: s.jsx(l, { children: s.jsx(S, { className: "p-4", children: s.jsx(k, { children: s.jsxs(R, { children: [s.jsx("h1", { children: "Login" }), s.jsx("p", { className: "text-body-secondary", children: "Sign In to your account" }), s.jsxs(u, { className: "mb-3", children: [s.jsx(x, { children: s.jsx(m, { icon: G }) }), s.jsx(C, { placeholder: "Username", autoComplete: "username", name: "username", onChange: e => n(e.target.value) })] }), s.jsxs(u, { className: "mb-4", children: [s.jsx(x, { children: s.jsx(m, { icon: b }) }), s.jsx(C, { type: "password", placeholder: "Password", name: "password", onChange: e => t(e.target.value), autoComplete: "current-password" })] }), s.jsx(p, { children: s.jsx(h, { xs: 6, children: s.jsx(I, { color: "primary", className: "px-4", onClick: j, children: "Login" }) }) })] }) }) }) }) }) }) }) }) }; export { U as default };
