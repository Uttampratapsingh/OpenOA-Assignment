from fastapi import APIRouter

from app.models.schemas import ContactMessage, ContactResponse

router = APIRouter()


@router.post("/contact", response_model=ContactResponse)
async def submit_contact(message: ContactMessage):
    """
    Submit a contact form message.

    In production, this would send an email or store the message
    in a database. For now, it logs and returns a success response.
    """
    # TODO: Integrate with email service or database in production
    print(f"Contact form received from {message.name} ({message.email}): {message.subject}")
    return ContactResponse(
        success=True,
        message="Thank you for your message! We'll get back to you soon.",
    )
