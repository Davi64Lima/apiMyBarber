import { Contact } from "../../../../src/domain/entities/contact";
import { ContactRepository } from "../../../../src/domain/interfaces/repositories/contact-repository";
import { GetAllContacts } from '../../../../src/domain/use-cases/contact/get-all-contacts'

describe("Get All Contacts Use Case", () => {

    class MockContactRepository implements ContactRepository {
        createContact(contact: Contact): Promise<boolean> {
            throw new Error("Method not implemented.");
        }
        getContacts(): Promise<Contact[]> {
            throw new Error("Method not implemented.");
        }
    }
    let mockContactRepository: ContactRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        mockContactRepository = new MockContactRepository()
    })

    test("should return data", async () => {
        const ExpectedResult = [{ id: "1", surname: "Smith", firstName: "John", email: "john@gmail.com" }]

        jest.spyOn(mockContactRepository, "getContacts").mockImplementation(() => Promise.resolve(ExpectedResult))
        const getAllContactsUse = new GetAllContacts(mockContactRepository)
        const result = await getAllContactsUse.execute();
        expect(result).toStrictEqual(ExpectedResult)

    });

})