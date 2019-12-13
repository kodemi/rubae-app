function importAll(r: any) {
    const images = {}; //tslint:disable-line
    r.keys().map((item: any, index: number) => {
        images[item.replace('./', '')] = r(item);
    });
    return images;
}

const images = importAll(
    (require as any).context('../../assets/equipment', false, /.jpg/)
);

export default images;
