import { useState, useEffect } from "react";
import moment from "moment";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource"; // Path to the schema generated by Amplify

// Generate the Amplify client
const client = generateClient<Schema>();

// Define types for events and modal state
export interface Event {
  start: Date;
  end: Date;
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

  // Fetch events from the database
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await client.models.Event.list();
    
        const calendarEvents = data.map((event) => {
          const startDateTime = moment(
            `${event.eventStartDate} ${event.eventStartTime}`, // Concatenate date and time
            "YYYY-MM-DD HH:mm"
          );
          const endDateTime = moment(
            `${event.eventEndDate} ${event.eventEndTime}`, // Concatenate date and time
            "YYYY-MM-DD HH:mm"
          );
    
          return {
            start: startDateTime.toDate(), // Convert moment object to Date
            end: endDateTime.toDate(),
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

    const startDateTime = moment(
      eventStartDate + " " + eventStartTime,
      "YYYY-MM-DD HH:mm"
    );
    const endDateTime = moment(
      eventEndDate + " " + eventEndTime,
      "YYYY-MM-DD HH:mm"
    );
    

    if (endDateTime.isBefore(startDateTime)) {
      setErrorMessage("End date/time cannot be before start date/time.");
      return;
    }
    

    try {
      await client.models.Event.create({
        eventTitle,
        eventStartDate,
        eventEndDate,
        eventStartTime,
        eventEndTime,
        eventLocation,
        eventDetails,
        allday,
      });

      const { data } = await client.models.Event.list();
    
        const updatedEvents = data.map((event) => {
          const startDateTime = moment(
            `${event.eventStartDate} ${event.eventStartTime}`, // Concatenate date and time
            "YYYY-MM-DD HH:mm"
          );
          const endDateTime = moment(
            `${event.eventEndDate} ${event.eventEndTime}`, // Concatenate date and time
            "YYYY-MM-DD HH:mm"
          );
    
          return {
            start: startDateTime.toDate(), // Convert moment object to Date
            end: endDateTime.toDate(),
            title: event.eventTitle ?? "",
            location: event.eventLocation ?? "",
            details: event.eventDetails ?? "",
            allDay: event.allday ?? false,
          };
        });
      setEvents(updatedEvents);
      resetFormFields();
      setIsModalOpen(false);
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

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
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
    formatDate,
  };
};

export default useCalendar;
