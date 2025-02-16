import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import RegisterForm from "@/components/Register/RegisterForm.tsx";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/RegisterForm">
                <RegisterForm/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;