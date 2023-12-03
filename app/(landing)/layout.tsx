const LandingLayout = ({
    children
}:{
    children: React.ReactNode
}) => {

    return(
    <div className="h-full bf-black overflow-auto bg-slate-300">
        <div className="mx-auto max-w-screen-xl h-full w-full">
            {children}
        </div>
    </div>
    );
}

export default LandingLayout;