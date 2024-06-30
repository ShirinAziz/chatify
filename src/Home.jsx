import React from "react";
import ChatBubble from "./Components/ChatBubble";

const Home = () => {
  return (
    <div className="px-20 mt-16">
      {/*Section 1 */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-10 w-[600px]">
          <h1 className="text-4xl md:text-5xl">
            Chat And Connect With Your Loved Ones Easily
          </h1>
          <p className="text-xl">
            Sign in right now to get started and get all the greatest perks!
          </p>
        </div>

        {/*Section 2 */}
        <div className="flex flex-col gap-4 w-96">
          <ChatBubble
            avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            text="Hi Emma, how you doing?"
            sender
          />
          <ChatBubble
            avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            text="..."
            sender
          />
          <ChatBubble
            avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            text="Hello Jasmine, good thankyou and you?"
            sender={false}
          />
          <ChatBubble
            avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            text="How is your week going?"
            sender
          />
          <ChatBubble
            avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            text="Been working on new project, so it's been pretty busy. What about yours?"
            sender={false}
          />
        </div>
      </div>

      {/*Section 3 */}
      <div className="flex flex-col gap-8">
        <div className="flex gap-4">
          <button className="btn btn-outline btn-primary">Sign In</button>
          <button class="btn btn-outline btn-secondary">Sign Up</button>
        </div>

        <div className="stats shadow w-[600px]">
          <div className="stat place-items-center">
            <div className="stat-title">Visitors</div>
            <div className="stat-value">31K</div>
            <div className="stat-desc">From January 1st to February 1st</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Users</div>
            <div className="stat-value text-secondary">4,200</div>
            <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Rating</div>
            <div className="stat-value">5.0</div>
            <div className="rating">
              <input
                type="radio"
                name="rating-2"
                className="mask mask-star-2 bg-orange-300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
