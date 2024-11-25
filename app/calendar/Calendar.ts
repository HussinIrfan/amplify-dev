import { useState, useEffect } from "react";
import moment from "moment";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource"; // Path to the schema generated by Amplify

// Generate the Amplify client
const client = generateClient<Schema>();

// Define types for events and modal state
export interface Event {
  start: Date | null; // Allow null for start date
  end: Date | null; // Allow null for end date
  title: string;
  allDay: boolean;
}

const useCalendar = () => {
  const [events, setEvents] = useState<Event[]>([]); // Store events fetched from the database
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const [eventTitle, setEventTitle] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDetails, setEventDetails] = useState("");
  const [allday, setIsAllDay] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Fetch events from the database
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await client.models.Event.list();

        const calendarEvents = data.map((event) => {
          const startDateTime = moment(
            `${event.eventStartDate} ${event.eventStartTime || ""}`, // Concatenate date and time
            "YYYY-MM-DD HH:mm"
          );
          const endDateTime = moment(
            `${event.eventEndDate} ${event.eventEndTime || ""}`, // Concatenate date and time
            "YYYY-MM-DD HH:mm"
          );

          return {
            start: startDateTime.isValid() ? startDateTime.toDate() : null, // Handle null times gracefully
            end: endDateTime.isValid() ? endDateTime.toDate() : null,
            title: event.eventTitle ?? "",
            location: event.eventLocation ?? "",
            details: event.eventDetails ?? "",
            allDay: event.allday ?? false,
          };
        });
        setEvents(calendarEvents);
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    };
    fetchEvents();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the event title is empty
    if (!eventTitle.trim()) {
      setErrorMessage("Event title cannot be empty.");
      return;
    }

    // If start or end time are empty, set them to null
    const startDateTime =
      eventStartDate && eventStartTime
        ? moment(eventStartDate + " " + eventStartTime, "YYYY-MM-DD HH:mm")
        : null;
    const endDateTime =
      eventEndDate && eventEndTime
        ? moment(eventEndDate + " " + eventEndTime, "YYYY-MM-DD HH:mm")
        : null;

    // Validate time logic only if both are provided
    if (startDateTime && endDateTime && endDateTime.isBefore(startDateTime)) {
      setErrorMessage("End date/time cannot be before start date/time.");
      return;
    }

    try {
      if (isEditMode && selectedEvent) {
        console.log("Edit mode: " + isEditMode + " selectedEvent: " + selectedEvent);
        await client.models.Event.update({
          id: selectedEvent.id,
          eventTitle: eventTitle,
          eventStartDate: eventStartDate,
          eventEndDate: eventEndDate,
          eventStartTime: eventStartTime || null, // Allow null if no time provided
          eventEndTime: eventEndTime || null, // Allow null if no time provided
          eventLocation: eventLocation,
          eventDetails: eventDetails,
          allday: allday,
        });
        console.log("Updated Event")
      } else {
        // Create a new event if not in edit mode
        await client.models.Event.create({
          eventTitle,
          eventStartDate,
          eventEndDate,
          eventStartTime: eventStartTime || null, // Allow null if no time provided
          eventEndTime: eventEndTime || null, // Allow null if no time provided
          eventLocation,
          eventDetails,
          allday,
        });
      }

      // Fetch updated events
      const { data } = await client.models.Event.list();

      const updatedEvents = data.map((event) => {
        const startDateTime = moment(
          `${event.eventStartDate} ${event.eventStartTime || ""}`,
          "YYYY-MM-DD HH:mm"
        );
        const endDateTime = moment(
          `${event.eventEndDate} ${event.eventEndTime || ""}`,
          "YYYY-MM-DD HH:mm"
        );

        return {
          start: startDateTime.isValid() ? startDateTime.toDate() : null, // Handle null times gracefully
          end: endDateTime.isValid() ? endDateTime.toDate() : null,
          title: event.eventTitle ?? "",
          location: event.eventLocation ?? "",
          details: event.eventDetails ?? "",
          allDay: event.allday ?? false,
        };
      });

      setEvents(updatedEvents);
      resetFormFields();
      setIsModalOpen(false);
      setSelectedEvent(false);
      setIsEditMode(false);
      console.log("Event created successfully!");
    } catch (error) {
      console.error("Error creating event: ", error);
    }
  };

  // Reset form fields to their initial state
  const resetFormFields = () => {
    setEventTitle("");
    setEventStartDate("");
    setEventEndDate("");
    setEventStartTime("");
    setEventEndTime("");
    setEventLocation("");
    setEventDetails("");
    setIsAllDay(false);
    setErrorMessage("");
  };

  // Map events to ensure start and end dates are undefined instead of null
  const mappedEvents = events.map((event) => ({
    ...event,
    start: event.start ?? undefined, // Convert null to undefined
    end: event.end ?? undefined, // Convert null to undefined
  }));

  const handleEventSelect = (event: any) => {
    // If the same event is clicked again, close the modal by setting selectedEvent to null
    if (selectedEvent && selectedEvent.title === event.title) {
      setSelectedEvent(null); // Close the popup
    } else {
      setSelectedEvent(event); // Open the popup with the new event's details
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetFormFields();
    setIsEditMode(false);
    setSelectedEvent(null); // Clear selected event when modal is closed
  };

  const handleCloseModalBasic = () => {
    setIsModalOpen(false);
    setSelectedEvent(null); // Clear selected event when modal is closed
  };

  const handleAddEventClick = () => {
    setIsModalOpen(true);
  };

  const handleEditEventClick = () => {
    if (selectedEvent) {
      setEventTitle(selectedEvent.eventTitle);
      setEventStartDate(moment(selectedEvent.start).format("YYYY-MM-DD"));
      setEventEndDate(moment(selectedEvent.end).format("YYYY-MM-DD"));
      setEventStartTime(moment(selectedEvent.start).format("HH:mm"));
      setEventEndTime(moment(selectedEvent.end).format("HH:mm"));
      setEventLocation(selectedEvent.location);
      setEventDetails(selectedEvent.details);
      setIsAllDay(selectedEvent.allDay);
      setIsModalOpen(true);
      setIsEditMode(true); // Set to edit mode when editing an existing event
    }
  };

  return {
    events,
    isModalOpen,
    eventTitle,
    eventStartDate,
    eventEndDate,
    eventStartTime,
    eventEndTime,
    eventLocation,
    eventDetails,
    allday,
    selectedEvent,
    errorMessage,
    mappedEvents,
    isEditMode,
    setIsModalOpen,
    setEventTitle,
    setEventStartDate,
    setEventEndDate,
    setEventStartTime,
    setEventEndTime,
    setEventLocation,
    setEventDetails,
    setIsAllDay,
    setErrorMessage,
    setSelectedEvent,
    handleSubmit,
    resetFormFields,
    handleEventSelect,
    handleCloseModal,
    handleAddEventClick,
    handleCloseModalBasic,
    handleEditEventClick,
  };
};

export default useCalendar;