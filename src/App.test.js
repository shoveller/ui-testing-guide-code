import {authenticate, useAuth} from "./useAuth";
import {renderHook, act} from "@testing-library/react-hooks";
import faker from "@faker-js/faker";

describe("useAuth()", () => {
  test("authenticate 함수는 user 객체를 반환한다", async () => {
    const res = await authenticate({});

    // user객체가 user.token을 반환한다는 점을 이용
    expect(res).toHaveProperty('user.token');
  });

  test("로그인이 되면 user 객체를 반환한다", async () => {
    const {result} = renderHook(() => useAuth());
    const [, login] = result.current;
    const userData = JSON.stringify({
      username: faker.internet.userName(),
      password: faker.internet.password(),
    });

    await act(async () => {
      // 컴포넌트를 업데이트하는 동작은 act 함수로 감싸주어야 한다
      await login(userData);
    })

    // hook이 업데이트 되었으므로 이제 데이터를 reload
    const [user] = result.current;

    // user 객체에 token 프로퍼티가 있다는 점을 이용
    expect(user).toHaveProperty('token')
  }, 1000);
});
