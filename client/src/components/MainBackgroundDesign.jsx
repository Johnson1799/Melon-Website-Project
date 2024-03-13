const BackgroundDesign = () => {
    return (
        <div className="login-decoration">
            <div className="rectangle-decoration">
                <svg width="1920px" height="693px" >
                    {/* right rectangle */}
                    <rect x="1250" y="0" width="700" height="300" fill="#f4a8ac" />
                    {/* left rectangle */}
                    <rect x="0" y="430" width="700" height="200" fill="#f4a8ac" />
                </svg>
            </div>
        </div>
    );
}
 
export default BackgroundDesign;