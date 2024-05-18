import { db } from "@/lib/db";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

const OrganizationIdPage = () => {

    async function create(formData: FormData) {
        "use server"
        const title = formData.get('title') as string
        await db.board.create({
            data: {
                title: title
            }
        })
    }

    const { userId, orgId } = auth()
    return (
        <div>
            <form action={create}>
                <input
                    type="text"
                    id="title"
                    name="title"
                    className="border-black border-2 rounded-md p-2" />
            </form>
        </div>
    )
}

export default OrganizationIdPage