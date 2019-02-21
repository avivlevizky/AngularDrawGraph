declare class mxDefaultToolbar {

    constructor(container: any);

    addLine();

    addMode(title, icon, mode, pressed?, funct?);

    addItem(title, icon, funct, pressedIcon, style, factoryMethod)
}