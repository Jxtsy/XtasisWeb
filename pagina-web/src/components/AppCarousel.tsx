import { Carousel } from "react-bootstrap";

export default function AppCarousel() {
    return(
        <>
            <Carousel>
                <Carousel.Item interval={1000}>
                    <img src="https://img.freepik.com/psd-gratis/maqueta-efecto-texto-neon_23-2149001551.jpg?w=1060&t=st=1662491837~exp=1662492437~hmac=fefcc3842aa210da7b6c0b704d0b7aa713a9d2a96385c39361d66a5ed4639cb6"
                        className="d-block w-100"></img>
                </Carousel.Item>
                <Carousel.Item interval={1000}>
                    <img src="https://img.freepik.com/psd-gratis/efecto-texto-neon-creativo_23-2149115291.jpg?w=996&t=st=1662494624~exp=1662495224~hmac=bd0f429dc7385b1c4ae305fffb94a32457767de01929c52b2a869c3b4920ba47"
                        className="d-block w-100"></img>
                </Carousel.Item>
                <Carousel.Item>
                    <img src="https://img.freepik.com/psd-gratis/maqueta-efecto-texto-neon_23-2149001554.jpg?w=996&t=st=1662494593~exp=1662495193~hmac=11f2c00476f5258b7eb901c41e062cf274d04eb25754c24e906c78da9bc9b318"
                        className="d-block w-100"></img>
                </Carousel.Item>
            </Carousel>
        </>
    )
}