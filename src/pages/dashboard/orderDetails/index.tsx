import { useState } from "react";

import RoundedCheckbox from "@/components/ui/RoundedCheckbox";
import { Button } from "@/components/ui/button";

import { OrderField } from "./components/OrderField";
import { OrderImageField } from "./components/OrderImageField";

const Statuses = ["Pending", "Approved", "Rejected"];

export function OrderDetails() {
  const [selectedStatuses, setSelectedStatuses] = useState<string>("Rejected");
  const handleStatusChange = (value: string) => {
    setSelectedStatuses(value);
  };
  return (
    <main className=" container py-5 shadow-custom rounded-xl space-y-5 ">
      <header className=" mb-5">
        <h1 className=" text-2xl font-semibold mb-2">Mentor Form</h1>
        <hr className=" border-[1px] border-zinc-300" />
      </header>
      <section className=" space-y-3">
        <header className=" flex justify-between flex-wrap items-center ">
          <h2 className="text-lg font-semibold">Basic information</h2>
          <OrderImageField
            className=" grow-0 "
            image="https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg"
          />
        </header>
        <div className="flex flex-col gap-5">
          {/* grid sm:grid-cols-3 h-min place-self-center gap-5 grow *:grow */}
          <div className=" w-full flex flex-wrap gap-5 grow *:grow">
            <OrderField header="Full Name">
              <span>John Doe</span>
            </OrderField>
            <OrderField header="Email">
              <span>Khalidahmed@gmail.com</span>
            </OrderField>
            <OrderField header="Mobile Number">
              <span>01129598595956569</span>
            </OrderField>
          </div>
        </div>
        <div className=" grid sm:grid-cols-2 lg:grid-cols-4 gap-5 ">
          <OrderField header="Date of birth">
            <span>26/22/2044</span>
          </OrderField>
          <OrderField header="Country">
            <span>Egypt</span>
          </OrderField>
          <OrderField header="city">
            <span>cairo</span>
          </OrderField>
          <OrderField header="Languages">
            <span className=" text-wrap">English, Arabic</span>
          </OrderField>
        </div>
        <OrderField header="About">
          <span className=" text-balance">
            I am a punctual and motivated individual who is able to work in a busy environment and produce high
            standards of work. I am an excellent team worker and am able to take instructions from all levels and build
            up good working relationships with all colleagues. I am flexible, reliable and possess excellent time
            keeping skills.
          </span>
        </OrderField>
      </section>
      <section className=" space-y-3">
        <h2 className="text-lg font-semibold">Education information</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 *:break-words ">
          <OrderField header="Education">
            <span>Bachelor's degree in Computer Science from X University.</span>
          </OrderField>
          <OrderField header="Work Experience">
            <span>Worked at ABC Tech as a Senior Frontend Developer</span>
          </OrderField>
          <OrderField header="Experience in years">
            <span>5 years</span>
          </OrderField>
          <OrderField header="Title">
            <span>Front end developer</span>
          </OrderField>
          <OrderField header="CV/Resume">
            <a
              onClick={(e) => e.stopPropagation()}
              href={"https://www.google.com"}
              target="_blank"
              rel="noreferrer"
              className="w-fit max-w-xl text-royal-blue  hover:underline underline-offset-2"
            >
              khalidahmedcv.pdf
            </a>
          </OrderField>
        </div>
      </section>
      <section className=" space-y-3">
        <h2 className="text-lg font-semibold">Social information</h2>
        <div className=" grid  sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-5 *:break-words ">
          <OrderField header="FaceBook">
            <span>Khalidahmed@gmail.com</span>
          </OrderField>
          <OrderField header="Linkedin">
            <span>Khalidahmed@gmail.com</span>
          </OrderField>
          <OrderField header="Github">
            <span>Khalidahmed@gmail.com</span>
          </OrderField>
        </div>
      </section>
      <footer className="flex flex-col justify-between gap-3 items-center">
        <div className="flex flex-wrap place-self-start  gap-2 md:gap-5">
          {Statuses.map((status) => (
            <RoundedCheckbox
              label={status}
              checked={selectedStatuses === status}
              onChange={handleStatusChange}
              value={status}
            />
          ))}
        </div>
        <Button className=" place-self-end px-8">submit</Button>
      </footer>
    </main>
  );
}
