// Core types
import type { FC } from "react";

// Core
import { Fragment, useContext, useState } from "react";

// Global components
import { Button } from "@components";

// Global styles
import { Field } from "@styles";

// Global types
import { Article } from "@types";

// Vendors
import styled, { css } from "styled-components";

// Store context
import { StoreContext } from "@context";

const Articles = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const FieldWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 15px;
`;

const ValutaWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 15px;

  ${({ theme: { defaults, colors, font, breakpoints, ...theme } }) => css`
    @media (max-width: ${breakpoints.md}px) {
      flex-wrap: wrap;

      input {
        flex: 0 0 100% !important;
      }
    }
  `}
`;

const Wrapper = styled.div`
  position: relative;
  width: 49.7%;

  ${({ theme: { defaults, colors, font, breakpoints, ...theme } }) => css`
    @media (max-width: ${breakpoints.md}px) {
      width: 100%;
      margin-top: 15px;
    }
  `}
`;

const SuggestionWrap = styled.div`
  border-radius: 0 0 2px 2px;
  border-top: 0;

  width: 100%;
  position: absolute;
  top: 100%;
  z-index: 10;

  ${({ theme: { defaults, colors, font, ...theme } }) => css`
    background-color: ${colors.white};
    border: 1px solid ${colors.textColor};
  `}
`;

const Suggestions = styled.div`
  display: flex;
  cursor: pointer;
  padding: 12px 18px;
  font-size: 14px;

  &:hover {
    cursor: pointer;

    ${({ theme: { defaults, colors, font, ...theme } }) => css`
      background-color: ${colors.lightGray};
    `}
  }
`;

const Border = styled.div`
  width: 97%;
  margin: auto;

  ${({ theme: { defaults, colors, font, ...theme } }) => css`
    &:not(:last-child) {
      border-bottom: 1px solid ${colors.lightGray};
    }
  `}
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

interface Articles {
  articlesData: Article[];
}

const index: FC<Articles> = ({ articlesData }) => {
  const { setIsActive, isActive, setArticles, valuta, setValuta, result } =
    useContext(StoreContext);

  const [articleName, setArticleName] = useState<string>("");
  const [articleQuantity, setArticleQuantity] = useState<string>("");
  const [articlePrice, setArticlePrice] = useState<string>("");

  // State for article suggestions
  const [articlesSuggestions, setArticlesSuggestions] = useState<Article[]>([]);

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArticleName(e.target.value);

    if (e.target.value.length > 0) {
      let matches: Article[] = [];

      matches = articlesData.filter((article) => {
        return article.name
          ?.toLowerCase()
          .includes(e.target.value.toLowerCase());
      });

      setArticlesSuggestions(matches);
    } else {
      let matches: Article[] = [];
      setArticlesSuggestions(matches);
    }
  };

  const onQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArticleQuantity(e.target.value);
  };

  const onPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArticlePrice(e.target.value);
  };

  const onValutaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValuta(e.target.value);
  };

  const handleAddArticle = () => {
    if (!articleName && !articleQuantity && !articlePrice) return;

    setArticleName("");
    setArticleQuantity("");
    setArticlePrice("");
    setIsActive(!isActive);

    result.push({
      name: articleName,
      quantity: articleQuantity,
      price: articlePrice,
    });

    setArticles(result);
  };

  return (
    <>
      <Articles>
        <ValutaWrap>
          <Field
            type="text"
            name="valuta"
            placeholder="Valuta"
            onChange={onValutaChange}
            value={valuta}
            halfSize
          />

          <Wrapper>
            <Field
              type="text"
              name="name"
              placeholder="Artikal"
              onChange={onNameChange}
              onBlur={() => {
                setTimeout(() => {
                  setArticlesSuggestions([]);
                }, 200);
              }}
              value={articleName}
              halfSize
            />

            {articlesSuggestions.length !== 0 && (
              <SuggestionWrap>
                {Array.isArray(articlesSuggestions) &&
                  articlesSuggestions
                    .slice(0, 5)
                    .map((articlesSuggestions, i) => (
                      <Fragment key={i}>
                        <Suggestions
                          key={articlesSuggestions.name}
                          onClick={() =>
                            setArticleName(articlesSuggestions.name)
                          }
                        >
                          {articlesSuggestions.name}
                        </Suggestions>
                        <Border />
                      </Fragment>
                    ))}
              </SuggestionWrap>
            )}
          </Wrapper>
        </ValutaWrap>

        <FieldWrapper>
          <Field
            name="quantity"
            placeholder="Kolicina"
            type="text"
            value={articleQuantity}
            onChange={onQtyChange}
            halfSize
          />

          <Field
            name="price"
            placeholder="Cena sa pdv"
            type="text"
            value={articlePrice}
            onChange={onPriceChange}
            halfSize
          />
        </FieldWrapper>
      </Articles>

      <ButtonWrap>
        <Button
          variant="primary"
          type="button"
          margin={{ md: { top: 1, bottom: 1 }, sm: { top: 1, bottom: 1 } }}
          onClick={handleAddArticle}
        >
          Dodaj
        </Button>
      </ButtonWrap>
    </>
  );
};

export { index as Articles };
