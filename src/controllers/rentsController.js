import * as rentServices from "../services/rentServices.js"

export async function addElement(req, res) {
    const { customerId, gameId, daysRented } = req.body;

    //check if customer exists
    await rentServices.checkCustomerId(customerId);

    //check if game exists
    await rentServices.checkGameId(gameId);

    //check days rented
    await rentServices.checkDaysRented(daysRented);

    //generate rentDate with date now()
    const rentDate = await rentServices.getRentDate();

    //generate originalPrice
    const originalPrice = await rentServices.getOriginalPrice(daysRented, gameId);

    //check game availability
    await rentServices.checkGameAvailability(gameId)

    const element = {
        customerId,
        gameId,
        rentDate,
        daysRented,
        returnDate: null,
        originalPrice,
        delayFee: null
    }

    await rentServices.addElement(element);

    return res.status(201).send('Created.');
}

export async function getElements(req, res) {
    const { customerId, gameId } = req.query;

    if (customerId) {
        const response = await rentServices.getElements(customerId, null);
        return res.status(200).send(response)
    }

    if (gameId) {
        const response = await rentServices.getElements(null, gameId);
        return res.status(200).send(response)
    }

    const response = await rentServices.getElements();
    return res.status(200).send(response)
}

export async function updateElement(req, res) {
    const { id } = req.params

    await rentServices.checkElementId(id);
    await rentServices.checkOpenRent(id);

    //calculate returnDate
    //calculate delayFee
    //update element
    
    return res.status(202).send(id)
}

export async function deleteElement(req, res) {
    return res.status(202).send('Delete rent OK.')
}