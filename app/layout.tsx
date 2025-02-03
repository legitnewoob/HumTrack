import Provider from '@/providers/sessionProvider';
import Navbar from './components/Navbar';


export const metadata = {
    title: "Promptopia",
    description: "Prompt sharing app"
};


const Rootlayout = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <Provider children={undefined} session={undefined}>
                <div className="main">
                    <div className="gradient" />
                </div>

                <main className="app">
                    <Navbar/>
                    {children}
                </main>
                </Provider>
            </body>
        </html>
    );
};

export default Rootlayout;